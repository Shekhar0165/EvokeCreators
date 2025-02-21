// app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone = 'Not provided', category, message } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email and message are required' },
        { status: 400 }
      );
    }
    
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Get category label
    const categories = {
      'all': 'Other',
      'web': 'Web Development',
      'app': 'Mobile Apps',
      'video': 'Video Editing',
      'poster': 'Poster Design',
      'graphic': 'Graphic Design'
    };
    const categoryLabel = categories[category] || 'Not specified';
    
    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Format date for email
    const date = new Date().toLocaleString();
    
    // Create HTML email content for owner
    const ownerHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4ade80; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
            .footer { margin-top: 20px; font-size: 12px; color: #777; text-align: center; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; margin-bottom: 5px; }
            .value { padding: 10px; background-color: #f9f9f9; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <p>You have received a new contact form submission from your website on ${date}.</p>
              
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              
              <div class="field">
                <div class="label">Project Category:</div>
                <div class="value">${categoryLabel}</div>
              </div>
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated email from your website contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Create HTML email content for client auto-response
    const clientHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4ade80; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
            .footer { margin-top: 20px; font-size: 12px; color: #777; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Contacting Us</h2>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              
              <p>Thank you for reaching out to us about your ${categoryLabel.toLowerCase()} project. We have received your message and appreciate your interest in our services.</p>
              
              <p>Our team will review your inquiry and get back to you as soon as possible, typically within 1-2 business days.</p>
              
              <p>For your records, here's a summary of the information you provided:</p>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Project Type:</strong> ${categoryLabel}</li>
                <li><strong>Date Submitted:</strong> ${date}</li>
              </ul>
              
              <p>If you have any additional information to share or any questions in the meantime, please don't hesitate to reply to this email.</p>
              
              <p>We look forward to discussing your project further!</p>
              
              <p>Best regards,<br>
              The Team</p>
            </div>
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email address if a different contact email was provided on our website.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Define email options for owner notification
    const ownerMailOptions = {
      from: email || `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'creatorsevoke@gmail.com',
      subject: `New Website Inquiry: ${categoryLabel} from ${name}`,
      html: ownerHtmlContent,
      // Add reply-to header so replies go directly to the customer
      replyTo: email,
    };
    
    // Define email options for client auto-response
    const clientMailOptions = {
      from: `"Your Business Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank You for Your Inquiry - We've Received Your Message`,
      html: clientHtmlContent,
    };
    
    // Send both emails using Promise.all for efficiency
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);
    
    // Optional: Save to database if you need to keep records
    // await saveContactToDatabase(body);
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}