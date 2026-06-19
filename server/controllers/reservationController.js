import Reservation from '../models/Reservation.js';

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

// Maximum seating capacity per time slot
const MAX_CAPACITY_PER_SLOT = 50;

/**
 * Check slot availability
 * @route GET /api/reservations/check
 */
export const checkAvailability = async (req, res) => {
  try {
    const { date, timeSlot, guests } = req.query;

    if (!date || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Date and time slot are required' });
    }

    const requestedGuests = parseInt(guests, 10) || 1;
    const searchDate = new Date(date);
    const startOfDay = new Date(searchDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(searchDate.setUTCHours(23, 59, 59, 999));

    // Find all reservations for this time slot on this day
    const reservations = await Reservation.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      timeSlot: timeSlot,
      status: { $ne: 'cancelled' }
    });

    const currentBookedGuests = reservations.reduce((sum, resv) => sum + resv.guests, 0);
    const remainingSeats = MAX_CAPACITY_PER_SLOT - currentBookedGuests;

    if (currentBookedGuests + requestedGuests > MAX_CAPACITY_PER_SLOT) {
      return res.status(200).json({
        success: true,
        available: false,
        remainingSeats: Math.max(0, remainingSeats),
        message: `Only ${Math.max(0, remainingSeats)} seats are remaining for this time slot.`
      });
    }

    return res.status(200).json({
      success: true,
      available: true,
      remainingSeats: remainingSeats
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error check availability', error: error.message });
  }
};

/**
 * Book a new table
 * @route POST /api/reservations
 */
export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, timeSlot, guests, seatingZone, dietaryNotes, specialOccasion } = req.body;

    if (!name || !email || !phone || !date || !timeSlot || !guests) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const requestedGuests = parseInt(guests, 10);
    const bookingDate = new Date(date);
    const startOfDay = new Date(bookingDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(bookingDate.setUTCHours(23, 59, 59, 999));

    // Check capacity again to avoid race conditions
    const existingReservations = await Reservation.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      timeSlot: timeSlot,
      status: { $ne: 'cancelled' }
    });

    const totalBooked = existingReservations.reduce((sum, resv) => sum + resv.guests, 0);
    if (totalBooked + requestedGuests > MAX_CAPACITY_PER_SLOT) {
      return res.status(400).json({
        success: false,
        message: `We regret that we cannot accommodate your party. Only ${MAX_CAPACITY_PER_SLOT - totalBooked} seats remain in this time slot.`
      });
    }

    // Generate unique code
    let bookingCode = generateBookingCode();
    let codeExists = await Reservation.findOne({ bookingCode });
    while (codeExists) {
      bookingCode = generateBookingCode();
      codeExists = await Reservation.findOne({ bookingCode });
    }

    // Create reservation record
    const reservation = await Reservation.create({
      name,
      email,
      phone,
      date: new Date(date),
      timeSlot,
      guests: requestedGuests,
      seatingZone,
      dietaryNotes,
      specialOccasion,
      bookingCode,
    });

    return res.status(201).json({
      success: true,
      message: 'Your table at Urban Maharaja has been reserved.',
      data: reservation
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error creating reservation', error: error.message });
  }
};

/**
 * Fetch guest bookings by email
 * @route GET /api/reservations/my-bookings
 */
export const getMyBookings = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Guest email parameter is required' });
    }

    const bookings = await Reservation.find({ email }).sort({ date: 1, timeSlot: 1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error retrieving bookings', error: error.message });
  }
};
