import Contact from '../models/Contact.js';
import Subscriber from '../models/Subscriber.js';
import { createNotification } from './notificationController.js';

/**
 * Handle general contact form queries
 * @route POST /api/contact
 */
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const newMessage = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Trigger notification
    await createNotification({
      type: 'contact',
      title: 'New Customer Inquiry',
      message: `New message from ${name} regarding: "${subject || 'No Subject'}"`,
      relatedId: newMessage._id
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Urban Maharaja. Our Royal Ambassador will contact you shortly.',
      data: newMessage
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error submitting message', error: error.message });
  }
};

/**
 * Subscribe email to newsletter list
 * @route POST /api/newsletter
 */
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email address' });
    }

    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      return res.status(200).json({
        success: true,
        message: 'You are already a valued member of the Maharaja Club.'
      });
    }

    // Create new subscriber
    const newSubscriber = await Subscriber.create({
      email: email.toLowerCase()
    });

    // Trigger notification
    await createNotification({
      type: 'subscriber',
      title: 'New Newsletter Subscriber',
      message: `${email.toLowerCase()} joined the newsletter subscription list.`,
      relatedId: newSubscriber._id
    });

    return res.status(201).json({
      success: true,
      message: 'Welcome to the Maharaja Club. Your royal invitations and exclusive culinary rewards will arrive soon.',
      data: newSubscriber
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error during subscription', error: error.message });
  }
};
