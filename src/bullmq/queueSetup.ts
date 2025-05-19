import { Queue } from 'bullmq';
import connection from '../config/redis';

export const fileQueue = new Queue('imageProcess', { connection });