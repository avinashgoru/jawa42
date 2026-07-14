import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Utility to send booking & inquiry confirmation emails via Nodemailer
 */
export const sendBookingEmail = async (lead) => {
  const { name, email, phone, city, dealer, model, date, source, buildDetails } = lead;

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailFrom = process.env.EMAIL_FROM || '"Jawa Motorcycles" <support@jawamotorcycles.com>';
  const adminEmail = process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL || 'support@jawamotorcycles.com';

  // Build HTML Content for Customer
  const customerSubject = `🏍️ Booking Confirmation: Jawa-42 ${model || 'Test Ride / Inquiry'}`;
  const customerHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0b0b; color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #2a2a2a;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #8b0000 0%, #4a0000 100%); padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; color: #ffffff;">JAWA MOTORCYCLES</h1>
        <p style="margin: 8px 0 0; color: #e0e0e0; font-size: 14px;">LEGENDARY PERFORMANCE & CLASSIC STYLING</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px 25px; background-color: #121212;">
        <h2 style="color: #ffffff; font-size: 22px; margin-top: 0;">Hello ${name},</h2>
        <p style="color: #b0b0b0; font-size: 15px; line-height: 1.6;">
          Thank you for showing interest in <strong style="color: #ffffff;">Jawa Motorcycles</strong>. We have successfully received your request for <strong style="color: #ff4444;">${source || 'Test Ride / Booking'}</strong>. Our dedicated team is reviewing your preferences and will get in touch shortly to confirm your appointment.
        </p>

        <!-- Booking Details Box -->
        <div style="background-color: #1a1a1a; border-left: 4px solid #8b0000; padding: 20px; border-radius: 6px; margin: 25px 0;">
          <h3 style="margin: 0 0 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; color: #ff4444;">Your Booking Summary</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${model ? `<tr><td style="padding: 6px 0; color: #888;">Model:</td><td style="padding: 6px 0; color: #fff; font-weight: bold;">${model}</td></tr>` : ''}
            ${date ? `<tr><td style="padding: 6px 0; color: #888;">Preferred Date:</td><td style="padding: 6px 0; color: #fff;">${date}</td></tr>` : ''}
            ${dealer ? `<tr><td style="padding: 6px 0; color: #888;">Dealership:</td><td style="padding: 6px 0; color: #fff;">${dealer}</td></tr>` : ''}
            ${city ? `<tr><td style="padding: 6px 0; color: #888;">City:</td><td style="padding: 6px 0; color: #fff;">${city}</td></tr>` : ''}
            <tr><td style="padding: 6px 0; color: #888;">Contact Phone:</td><td style="padding: 6px 0; color: #fff;">${phone}</td></tr>
            ${buildDetails ? `
              <tr><td style="padding: 6px 0; color: #888;">Color:</td><td style="padding: 6px 0; color: #fff;">${buildDetails.color || 'Standard'}</td></tr>
              <tr><td style="padding: 6px 0; color: #888;">Wheels / Exhaust:</td><td style="padding: 6px 0; color: #fff;">${buildDetails.wheels || ''} / ${buildDetails.exhaust || ''}</td></tr>
              ${buildDetails.estimatedPrice ? `<tr><td style="padding: 6px 0; color: #888;">Estimated Price:</td><td style="padding: 6px 0; color: #ff4444; font-weight: bold;">₹ ${buildDetails.estimatedPrice.toLocaleString('en-IN')}</td></tr>` : ''}
            ` : ''}
          </table>
        </div>

        <p style="color: #b0b0b0; font-size: 14px; line-height: 1.6;">
          If you have any urgent questions, feel free to contact our customer relations center or visit your nearest showroom.
        </p>

        <div style="margin-top: 30px; text-align: center;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dealers" style="background-color: #8b0000; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">Locate Dealership</a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #080808; padding: 20px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #1f1f1f;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Jawa Motorcycles. All rights reserved.</p>
        <p style="margin: 4px 0 0;">Legendary Heritage • Modern Engineering</p>
      </div>
    </div>
  `;

  // Build HTML Content for Admin / Dealership
  const adminSubject = `🚨 [NEW LEAD] ${source || 'Test Ride'} Booking - ${name} (${city || 'Online'})`;
  const adminHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f0f0f; color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #2a2a2a;">
      <div style="background: linear-gradient(135deg, #b30000 0%, #660000 100%); padding: 25px 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 22px; letter-spacing: 1px; text-transform: uppercase; color: #ffffff;">🚨 NEW CUSTOMER BOOKING LEAD</h2>
        <p style="margin: 6px 0 0; color: #f0f0f0; font-size: 13px;">Immediate Follow-up Required (Within 2 Hours)</p>
      </div>

      <div style="padding: 30px 25px; background-color: #141414;">
        <h3 style="color: #ff4444; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; border-bottom: 1px solid #2a2a2a; padding-bottom: 10px;">Customer Contact Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px; margin-bottom: 25px;">
          <tr><td style="padding: 8px 0; color: #888; width: 40%;">Customer Name:</td><td style="padding: 8px 0; color: #fff; font-weight: bold;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Customer Gmail:</td><td style="padding: 8px 0; color: #4fa3ff; font-weight: bold;"><a href="mailto:${email}" style="color: #4fa3ff; text-decoration: none;">${email || 'Not Provided'}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Mobile Phone:</td><td style="padding: 8px 0; color: #22c55e; font-weight: bold;"><a href="tel:${phone}" style="color: #22c55e; text-decoration: none;">${phone}</a></td></tr>
        </table>

        <h3 style="color: #ff4444; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; border-bottom: 1px solid #2a2a2a; padding-bottom: 10px;">Booking Preferences</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 8px 0; color: #888; width: 40%;">Motorcycle Model:</td><td style="padding: 8px 0; color: #fff; font-weight: bold;">${model || 'Jawa 42'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Preferred Date:</td><td style="padding: 8px 0; color: #ffcc00; font-weight: bold;">${date || 'ASAP'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">City / Location:</td><td style="padding: 8px 0; color: #fff;">${city || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Dealership Selected:</td><td style="padding: 8px 0; color: #fff; font-weight: bold;">${dealer || 'Any Available Showroom'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Booking Source:</td><td style="padding: 8px 0; color: #bbb;">${source || 'Website Form'}</td></tr>
        </table>

        <div style="margin-top: 30px; padding: 15px; background-color: #1f1f1f; border-radius: 8px; text-align: center;">
          <a href="tel:${phone}" style="background-color: #22c55e; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; margin-right: 10px; display: inline-block;">📞 Call Customer</a>
          ${email ? `<a href="mailto:${email}?subject=Jawa%2042%20Test%20Ride%20Confirmation" style="background-color: #3b82f6; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">✉️ Reply via Email</a>` : ''}
        </div>
      </div>
    </div>
  `;

  // Check if real SMTP credentials are provided
  if (!smtpUser || smtpUser === 'your_email@gmail.com' || !smtpPass || smtpPass === 'your_gmail_app_password_here') {
    console.log('\n====================================================================');
    console.log(`📧 [NODEMAILER PREVIEW - NO SMTP PASS CONFIGURED YET]`);
    console.log(`To: ${email || 'Customer (email not provided)'}`);
    console.log(`Subject: ${customerSubject}`);
    console.log(`Summary: Sent confirmation for ${name} (${phone}) booking ${model || 'Jawa 42'} in ${city || 'Online'}`);
    console.log(`Admin Copy: Sent to ${adminEmail}`);
    console.log(`ℹ️ To send live emails to real Gmail/Outlook addresses, fill SMTP_USER and SMTP_PASS in backend/.env`);
    console.log('====================================================================\n');
    return { success: true, preview: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send to Customer (if email provided)
    if (email) {
      await transporter.sendMail({
        from: emailFrom,
        to: email,
        subject: customerSubject,
        html: customerHtml,
      });
      console.log(`📨 Customer confirmation email sent via Nodemailer to ${email}`);
    }

    // Send to Admin / Dealership Team
    await transporter.sendMail({
      from: emailFrom,
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml,
    });
    console.log(`📨 Dealership/Admin notification email sent to ${adminEmail}`);

    return { success: true, preview: false };
  } catch (error) {
    console.error(`❌ Nodemailer Error while sending email:`, error);
    // Return error status so callers can log or handle gracefully
    return { success: false, error: error.message };
  }
};
