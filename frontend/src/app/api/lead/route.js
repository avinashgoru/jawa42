import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dns from 'dns';
import Lead from '@/models/Lead';
import { sendBookingEmail } from '@/utils/sendEmail';

// Helper to connect to MongoDB directly from Next.js API Route if needed
let isConnected = false;
async function connectToMongo() {
  if (isConnected) return;
  try { dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']); } catch (e) {}
  const uri = process.env.MONGODB_URI || 'mongodb+srv://avinashgoru26_db_user:y1rU1ngAWwvnHOIw@cluster0.c2upypj.mongodb.net/jawa_42_db?retryWrites=true&w=majority&appName=Cluster0';
  await mongoose.connect(uri);
  isConnected = true;
  console.log('🍃 Next.js API connected to MongoDB Atlas');
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Name and Phone number are required fields.' },
        { status: 400 }
      );
    }

    // Attempt 1: Forward to Express Backend Server (Port 5000) if running
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    try {
      const controllerRes = await fetch(`${backendUrl}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (controllerRes.ok) {
        const data = await controllerRes.json();
        return NextResponse.json(data, { status: controllerRes.status });
      }
    } catch (backendError) {
      console.log('ℹ️ Express backend server unreachable on port 5000, storing directly to MongoDB Atlas from Next.js...');
    }

    // Attempt 2: Direct MongoDB Atlas storage via Mongoose
    await connectToMongo();
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

    console.log(`✅ Lead stored in MongoDB Atlas via Next.js route! ID: ${newLead._id}`);

    // Trigger confirmation & notification email
    sendBookingEmail(newLead).catch(err => console.error('Nodemailer async error:', err));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead captured, stored in MongoDB Atlas, and confirmation email triggered successfully.',
        data: newLead
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error while storing lead.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${backendUrl}/api/lead`);
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch (e) {}

    await connectToMongo();
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
