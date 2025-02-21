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
    
    // Create HTML email content for owner notification
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
    
    // Create HTML email content for client thank-you email
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
            .rating { color: #FFD700; font-size: 24px; text-align: center; margin: 15px 0; }
            .message { margin: 20px 0; }
            .cta { background-color: #4ade80; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Your Review!</h2>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              
              <p class="message">Thank you for taking the time to share your experience with us. Your feedback is incredibly valuable and helps us improve our services.</p>
              
              <div class="rating">
                ${'★'.repeat(rating)}${'☆'.repeat(5-rating)}
              </div>
              
              <p>Your review has been received and will be published on our website soon. We appreciate your support and look forward to serving you again in the future.</p>
              
              ${rating >= 4 ? `
                <p>We're thrilled that you had a positive experience! If you have a moment, we'd be grateful if you could share your experience on Google or social media to help others discover our services.</p>
                <a href="https://g.page/review/your-business-link" class="cta">Leave a Google Review</a>
              ` : `
                <p>We're always looking to improve, and your feedback helps us do just that. If there's anything else you'd like to share or if there's any way we can make things right, please don't hesitate to reach out directly.</p>
              `}
              
              <p style="margin-top: 20px;">Best regards,<br>The Team</p>
            </div>
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Define email options for owner notification
    const ownerMailOptions = {
      from: `"Website Review" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'creatorsevoke@gmail.com',
      subject: `New Website Review: ${rating} stars from ${name}`,
      html: ownerHtmlContent,
      replyTo: email,
    };
    
    // Define email options for client thank-you email
    const clientMailOptions = {
      from: `"Evoke Creators" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank You for Your Review!`,
      html: clientHtmlContent,
    };
    
    // Send both emails using Promise.all for efficiency
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);
    
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