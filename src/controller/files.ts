import { Request, Response } from 'express';
import prisma from '../prisma';
import { fileQueue } from "../bullmq/queueSetup"
import path from "path"

type bodyType = {
    title: string,
    description: string
}
export async function uploadFileHandle(req: Request, res: Response) {
    const body: bodyType = req.body;
    const { destination, filename } = req.file as Express.Multer.File;
    const userId = (req as any).userId
    if (body.title === '' || body.description === "") {
        res.status(400).send("title and description is required")
        return
    }
    const file = await prisma.file.create({
        data: {
            title: body.title,
            description: body.description,
            extracted_data: "",
            original_filename: filename,
            storage_path: path.join(destination, filename),
            status: 'uploaded',
            users: {
                connect: { id: Number(userId) }
            },
        }
    })
    // create job

    const job = await prisma.job.create({
        data: {
            fileId: file.id,
            job_type: "image_process",
            status: 'queued',
            error_message: ""
        }
    })
    await fileQueue.add("process", {
        jobId: job.id
    })

    res.status(200).send("File uploaded successfully")
}


export async function fileList(req: Request, res: Response) {
    try {
        const page = Number(req.query.page) || 1;
        const perPageRecord = Number(req.query.perPageRecord) || 10;

        const offset = (page - 1) * perPageRecord;

        const userId = (req as any).userId
        const where = { userId: Number(userId) }
        const totalFiles = await prisma.file.count({ where })

        const files = await prisma.file.findMany({
            where,
            skip: offset,
            take: perPageRecord,
        })
        const totalpage = Math.floor(totalFiles / perPageRecord)
        res.status(200).json({ files, pagination: { page, perPageRecord, totalpage } })
    } catch (error) {
        res.status(500).send("something went wrong")
    }
}
type fileInfoParams = { fileId: string }
export async function fileInfo(req: Request<fileInfoParams>, res: Response) {
    try {

        const { fileId } = req.params
        const userId = (req as any).userId

        const file = await prisma.file.findFirst({ where: { id: Number(fileId), userId: Number(userId) } })


        res.status(200).json(file)
    } catch (error) {
        res.status(500).send("something went wrong")

    }
}
