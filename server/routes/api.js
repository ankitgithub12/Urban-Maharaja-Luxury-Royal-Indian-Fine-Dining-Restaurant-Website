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
import {
  login,
  getProfile,
  updateProfile
} from '../controllers/authController.js';
import {
  getNotificationsStream,
  getNotificationHistory,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from '../controllers/notificationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Reservation endpoints
router.get('/reservations/check', checkAvailability);
router.post('/reservations', createReservation);
router.get('/reservations/my-bookings', getMyBookings);

// Engagement endpoints
router.post('/contact', submitContact);
router.post('/newsletter', subscribeNewsletter);

// Admin Auth
router.post('/admin/login', login);
router.get('/admin/profile', authMiddleware, getProfile);
router.put('/admin/profile', authMiddleware, updateProfile);

// Admin Notifications
router.get('/admin/notifications', authMiddleware, getNotificationsStream);
router.get('/admin/notifications/history', authMiddleware, getNotificationHistory);
router.put('/admin/notifications/read-all', authMiddleware, markAllAsRead);
router.put('/admin/notifications/:id/read', authMiddleware, markAsRead);
router.delete('/admin/notifications/:id', authMiddleware, deleteNotification);

// Admin dashboard operations
router.get('/admin/stats', authMiddleware, getAdminStats);
router.get('/admin/reservations', authMiddleware, getAllReservations);
router.post('/admin/reservations', authMiddleware, createAdminReservation);
router.put('/admin/reservations/:id', authMiddleware, updateReservation);
router.delete('/admin/reservations/:id', authMiddleware, deleteReservation);
router.get('/admin/contacts', authMiddleware, getAllContacts);
router.delete('/admin/contacts/:id', authMiddleware, deleteContact);
router.get('/admin/subscribers', authMiddleware, getAllSubscribers);
router.post('/admin/subscribers', authMiddleware, createAdminSubscriber);
router.delete('/admin/subscribers/:id', authMiddleware, deleteSubscriber);

export default router;
