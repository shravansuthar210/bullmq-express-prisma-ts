import { Worker } from "bullmq";
import prisma from "../prisma";
import connection from "../config/redis";

const fileWorker = new Worker(
  "imageProcess",
  async (job) => {
    const jobId = job.data.jobId;
    console.log(jobId)
    try {
      const jobObj = await prisma.job.update({
        where: { id: jobId },
        data: {
          status: "processing",
          started_at: new Date(),
        },
      });
      const file = await prisma.file.update({
        where: { id: jobObj.fileId },
        data: {
          status: "processing",
        },
      });
      // extract data
      await new Promise((res) => setTimeout(res, 10000));
      const extracted_data = "extracted_data";
      console.log(extracted_data);
      await prisma.file.update({
        where: { id: jobObj.fileId },
        data: {
          status: "processed",
          extracted_data,
        },
      });
      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: "completed",
          completed_at: new Date(),
        },
      });
    } catch (error) {
      console.log(error);
      const errorJob = await prisma.job.update({
        where: { id: jobId },
        data: { status: "failed" },
        select: { fileId: true },
      });
      await prisma.file.update({
        where: { id: errorJob.fileId },
        data: { status: "failed" },
      });
    }
  },
  { connection }
);
fileWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

fileWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed with error:`, err);
});

fileWorker.on("error", (err) => {
  console.error("Worker error:", err);
});