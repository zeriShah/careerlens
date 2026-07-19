import { Router, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import mammoth from 'mammoth';
import prisma from '../config/db';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const pdfParse = require('pdf-parse');

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// 1. Upload/Create a Project
router.post('/upload', authenticate, upload.single('file'), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const ext = path.extname(file.originalname).toLowerCase();
    let text = '';

    if (ext === '.txt' || ext === '.md') {
      text = file.buffer.toString('utf-8');
    } else if (ext === '.docx') {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      text = result.value;
    } else if (ext === '.pdf') {
      const data = await pdfParse(file.buffer);
      text = data.text;
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Use .pdf, .docx, .txt, or .md' });
    }

    if (!text.trim()) {
      return res.status(400).json({ error: 'Parsed text is empty.' });
    }

    // Extract title from original name (remove extension)
    const title = path.basename(file.originalname, ext);

    const project = await prisma.project.create({
      data: {
        userId,
        filename: file.originalname,
        title: title,
        description: text.trim()
      }
    });

    return res.status(201).json({ success: true, project });
  } catch (err: any) {
    console.error('[Upload Project Error]:', err);
    return res.status(500).json({ error: `Failed to upload project: ${err.message || 'Unknown error'}` });
  }
});

// 2. Get All Projects for Current User
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({ success: true, projects });
  } catch (err: any) {
    console.error('[Get Projects Error]:', err);
    return res.status(500).json({ error: `Failed to retrieve projects: ${err.message || 'Unknown error'}` });
  }
});

// 3. Delete a Project
router.delete('/:id', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify ownership
    const existingProject = await prisma.project.findFirst({
      where: { id, userId }
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    await prisma.project.delete({
      where: { id }
    });

    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err: any) {
    console.error('[Delete Project Error]:', err);
    return res.status(500).json({ error: `Failed to delete project: ${err.message || 'Unknown error'}` });
  }
});

export default router;
