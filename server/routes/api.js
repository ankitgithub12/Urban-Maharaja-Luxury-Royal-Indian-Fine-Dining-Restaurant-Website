import express from 'express';
import {
  checkAvailability,
  createReservation,
  getMyBookings
} from '../controllers/reservationController.js';
import {
  submitContact,
  subscribeNewsletter
} from '../controllers/contactController.js';
import {
  getAdminStats,
  getAllReservations,
  createAdminReservation,
  updateReservation,
  deleteReservation,
  getAllContacts,
  deleteContact,
  getAllSubscribers,
  createAdminSubscriber,
  deleteSubscriber
} from '../controllers/adminController.js';

const router = express.Router();

// Reservation endpoints
router.get('/reservations/check', checkAvailability);
router.post('/reservations', createReservation);
router.get('/reservations/my-bookings', getMyBookings);

// Engagement endpoints
router.post('/contact', submitContact);
router.post('/newsletter', subscribeNewsletter);

// Admin dashboard operations
router.get('/admin/stats', getAdminStats);
router.get('/admin/reservations', getAllReservations);
router.post('/admin/reservations', createAdminReservation);
router.put('/admin/reservations/:id', updateReservation);
router.delete('/admin/reservations/:id', deleteReservation);
router.get('/admin/contacts', getAllContacts);
router.delete('/admin/contacts/:id', deleteContact);
router.get('/admin/subscribers', getAllSubscribers);
router.post('/admin/subscribers', createAdminSubscriber);
router.delete('/admin/subscribers/:id', deleteSubscriber);

export default router;
