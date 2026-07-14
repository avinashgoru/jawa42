import Lead from '../models/Lead.js';
import { sendBookingEmail } from '../utils/sendEmail.js';

/**
 * Controller to capture test ride and dealership inquiry leads
 * POST /api/lead
 */
export const captureLead = async (req, res) => {
  try {
    const body = req.body;

    // Validation
    if (!body || !body.name || !body.phone) {
      return res.status(400).json({
        success: false,
        error: 'Name and Phone number are required fields.',
      });
    }

    console.log(`Processing submission for ${body.name} (${body.phone})...`);

    // Store info directly into MongoDB using Mongoose Lead model
    const newLead = await Lead.create({
      name: body.name,
      phone: body.phone,
      email: body.email,
      city: body.city,
      dealer: body.dealer,
      model: body.model,
      date: body.date,
      source: body.source || 'Website Inquiry',
      buildDetails: body.buildDetails,
    });

    console.log(`✅ Lead stored successfully in MongoDB Atlas! ID: ${newLead._id}`);

    // Trigger Nodemailer confirmation & admin alert email asynchronously
    sendBookingEmail(newLead).catch(err => console.error('Nodemailer async error:', err));

    // Return success response with saved lead data
    return res.status(201).json({
      success: true,
      message: 'Lead captured, stored in MongoDB, and confirmation email triggered successfully.',
      data: newLead,
    });
  } catch (error) {
    console.error('Lead capture controller error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error while saving lead to database.',
    });
  }
};

/**
 * Get all stored submissions (GET /api/lead)
 */
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error('Get leads error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve stored info from MongoDB.',
    });
  }
};
