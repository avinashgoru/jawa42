import express from 'express';
import { captureLead, getLeads } from '../controllers/leadController.js';

const router = express.Router();

// POST /api/lead - Store test ride / configurator / dealership lead into MongoDB
router.post('/', captureLead);

// GET /api/lead - Retrieve all stored leads from MongoDB
router.get('/', getLeads);

export default router;
