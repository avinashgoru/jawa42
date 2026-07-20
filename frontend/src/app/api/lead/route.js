import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dns from 'dns';
import Lead from '@/models/Lead';
import { sendBookingEmail } from '@/utils/sendEmail';

let isConnected = false;

async function connectToMongo() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not configured. Set it in frontend/.env.local');
  }

  try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  } catch {
    // Local DNS override is best-effort
  }

  await mongoose.connect(uri);
  isConnected = true;
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Name and Phone number are required fields.' },
        { status: 400 }
      );
    }

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
    } catch {
      // Fall through to direct Mongo when Express is offline
    }

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

    sendBookingEmail(newLead).catch((err) =>
      console.error('Nodemailer async error:', err)
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Lead captured successfully.',
        data: newLead,
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
    } catch {
      // Fall through
    }

    await connectToMongo();
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
