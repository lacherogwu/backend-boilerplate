import express from 'express';
import { mapDirFiles } from '../utils/core.js';
import cookieParser from 'cookie-parser';

const router = express.Router();
const files = await mapDirFiles(import.meta.url, 'values', 'global');

// prettier-ignore
[
    express.json(),
    cookieParser(),
    ...files,
].forEach(md => router.use(md));

export default router;
