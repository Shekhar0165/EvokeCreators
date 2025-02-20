// app/api/reviews/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, name, rating, review } = body;
    
    // Validate required fields
    if (!email || !name || !rating || !review) {
      return NextResponse.json(
        { success: false, message: 'Email, name, rating and review are required' },
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

    // Validate rating (1-5)
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }
    
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
    
    // Create HTML email content
    const htmlContent = `
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
            .rating { color: #4ade80; font-size: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Review Submission</h2>
            </div>
            <div class="content">
              <p>You have received a new review submission on ${date}.</p>
              
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <div class="label">Rating:</div>
                <div class="value rating">${'★'.repeat(rating)}${'☆'.repeat(5-rating)}</div>
              </div>
              
              <div class="field">
                <div class="label">Review:</div>
                <div class="value">${review.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated email from your website review system.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Define email options
    const mailOptions = {
      from: `"Website Review" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'creatorsevoke@gmail.com',
      subject: `New Website Review: ${rating} stars from ${name}`,
      html: htmlContent,
      replyTo: email,
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Optional: Save to database here if needed
    // await saveReviewToDatabase(body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Review submitted successfully' 
    });
    
  } catch (error) {
    console.error('Review submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit review',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}