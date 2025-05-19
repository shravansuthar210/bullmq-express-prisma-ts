import { Router } from 'express';
import { fileInfo, fileList, uploadFileHandle } from '../controller/files';
import { upload } from '../middleware/upload.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management endpoints
 */

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     description: Upload a file with a title and description.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *               title:
 *                 type: string
 *                 description: Title for the file
 *               description:
 *                 type: string
 *                 description: Description of the file
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 file:
 *                   type: object
 */

/**
 * @swagger
 * /file/file-list:
 *   get:
 *     summary: Get list of uploaded files
 *     tags: [Files]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: perPageRecord
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *         description: Number of records per page (default is 10)
 *     responses:
 *       200:
 *         description: List of uploaded files with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                       description: Total number of files
 *                     page:
 *                       type: integer
 *                       example: 1
 *                       description: Current page number
 *                     perPage:
 *                       type: integer
 *                       example: 10
 *                       description: Number of records per page
 *                 data:
 *                   type: array
 *                   description: List of files for the current page
 *                   items:
 *                     $ref: '#/components/schemas/File'
 */


/**
 * @swagger
 * /file/file-list/{fileId}:
 *   get:
 *     summary: Get file details by ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the file to retrieve
 *     responses:
 *       200:
 *         description: File details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/File'
 */

router.post("/upload", upload.single("file"), uploadFileHandle);
router.get("/file-list", fileList);
router.get("/file-list/:fileId", fileInfo);

export default router;
