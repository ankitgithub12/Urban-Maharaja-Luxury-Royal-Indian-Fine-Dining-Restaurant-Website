import Reservation from '../models/Reservation.js';
import Contact from '../models/Contact.js';
import Subscriber from '../models/Subscriber.js';

// Helper to generate a unique booking reference
const generateBookingCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomStr = '';
  for (let i = 0; i < 4; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `UM-${dateStr}-${randomStr}`;
};

/**
 * Get aggregated statistics for the admin dashboard
 * @route GET /api/admin/stats
 */
export const getAdminStats = async (req, res) => {
  try {
    const totalReservations = await Reservation.countDocuments();
    const pendingCount = await Reservation.countDocuments({ status: 'pending' });
    const confirmedCount = await Reservation.countDocuments({ status: 'confirmed' });
    const cancelledCount = await Reservation.countDocuments({ status: 'cancelled' });
    
    // Today's boundaries
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todayReservations = await Reservation.find({
      date: { $gte: todayStart, $lte: todayEnd },
      status: { $ne: 'cancelled' }
    });

    const todayGuests = todayReservations.reduce((sum, r) => sum + r.guests, 0);
    const todayCount = todayReservations.length;

    const totalContacts = await Contact.countDocuments();
    const totalSubscribers = await Subscriber.countDocuments();

    return res.status(200).json({
      success: true,
      stats: {
        totalReservations,
        pendingCount,
        confirmedCount,
        cancelledCount,
        todayCount,
        todayGuests,
        totalContacts,
        totalSubscribers
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving admin stats', error: error.message });
  }
};

/**
 * Get all reservations
 * @route GET /api/admin/reservations
 */
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({}).sort({ date: -1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving reservations', error: error.message });
  }
};

/**
 * Create a reservation (Admin override)
 * @route POST /api/admin/reservations
 */
export const createAdminReservation = async (req, res) => {
  try {
    const { name, email, phone, date, timeSlot, guests, seatingZone, dietaryNotes, specialOccasion, status } = req.body;

    if (!name || !email || !phone || !date || !timeSlot || !guests) {
      return res.status(400).json({ success: false, message: 'Required fields must be completed' });
    }

    let bookingCode = generateBookingCode();
    let codeExists = await Reservation.findOne({ bookingCode });
    while (codeExists) {
      bookingCode = generateBookingCode();
      codeExists = await Reservation.findOne({ bookingCode });
    }

    const reservation = await Reservation.create({
      name,
      email,
      phone,
      date: new Date(date),
      timeSlot,
      guests: parseInt(guests, 10),
      seatingZone: seatingZone || 'No Preference',
      dietaryNotes,
      specialOccasion: specialOccasion || 'None',
      bookingCode,
      status: status || 'confirmed'
    });

    return res.status(201).json({
      success: true,
      message: 'Reservation created successfully by admin',
      data: reservation
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating reservation', error: error.message });
  }
};

/**
 * Update reservation status or details
 * @route PUT /api/admin/reservations/:id
 */
export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    const updatedRes = await Reservation.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedRes) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Reservation updated successfully',
      data: updatedRes
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating reservation', error: error.message });
  }
};

/**
 * Delete a reservation
 * @route DELETE /api/admin/reservations/:id
 */
export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRes = await Reservation.findByIdAndDelete(id);

    if (!deletedRes) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Reservation permanently deleted'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting reservation', error: error.message });
  }
};

/**
 * Retrieve all contact inquiries
 * @route GET /api/admin/contacts
 */
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving contacts', error: error.message });
  }
};

/**
 * Delete a contact inquiry
 * @route DELETE /api/admin/contacts/:id
 */
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact inquiry deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting contact inquiry', error: error.message });
  }
};

/**
 * Get all newsletter subscribers
 * @route GET /api/admin/subscribers
 */
export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving subscribers', error: error.message });
  }
};

/**
 * Add a newsletter subscriber manually
 * @route POST /api/admin/subscribers
 */
export const createAdminSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    const emailLower = email.toLowerCase();
    const existing = await Subscriber.findOne({ email: emailLower });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email is already subscribed' });
    }

    const sub = await Subscriber.create({ email: emailLower });
    return res.status(201).json({
      success: true,
      message: 'Email subscribed successfully',
      data: sub
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error adding subscriber', error: error.message });
  }
};

/**
 * Delete a newsletter subscriber
 * @route DELETE /api/admin/subscribers/:id
 */
export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSub = await Subscriber.findByIdAndDelete(id);

    if (!deletedSub) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Subscriber removed successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting subscriber', error: error.message });
  }
};
