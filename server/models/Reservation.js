import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your contact number'],
  },
  date: {
    type: Date,
    required: [true, 'Please select a dining date'],
  },
  timeSlot: {
    type: String,
    required: [true, 'Please select a preferred dining time slot'],
  },
  guests: {
    type: Number,
    required: [true, 'Please specify the number of guests'],
    min: [1, 'Must be at least 1 guest'],
    max: [20, 'For parties larger than 20, please contact our events division directly.'],
  },
  seatingZone: {
    type: String,
    required: [true, 'Please select your preferred seating zone'],
    enum: ['Main Darbar', 'Diwan-i-Khas (Private Suite)', 'Peacock Pavilion (Al Fresco)', 'Sheesh Mahal (Glass Room)', 'No Preference'],
    default: 'No Preference',
  },
  dietaryNotes: {
    type: String,
    trim: true,
  },
  specialOccasion: {
    type: String,
    enum: ['None', 'Birthday', 'Anniversary', 'Date Night', 'Business Dinner', 'Other'],
    default: 'None',
  },
  bookingCode: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Reservation', reservationSchema);
