import Notification from '../models/Notification.js';

let clients = [];

// SSE stream for real-time notifications
export const getNotificationsStream = (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Send connection established event
    res.write('data: ' + JSON.stringify({ type: 'connection', status: 'connected' }) + '\n\n');

    const clientId = Date.now();
    const newClient = { id: clientId, res };
    clients.push(newClient);

    // Keep connection alive with simple pings
    const keepAliveInterval = setInterval(() => {
      res.write(': keep-alive\n\n');
    }, 20000);

    req.on('close', () => {
      clearInterval(keepAliveInterval);
      clients = clients.filter(c => c.id !== clientId);
    });
  } catch (error) {
    console.error('[SSE connection error]', error.message);
  }
};

// Helper function to create and broadcast notification
export const createNotification = async ({ type, title, message, relatedId }) => {
  try {
    const notification = new Notification({
      type,
      title,
      message,
      relatedId
    });
    await notification.save();

    // Broadcast message to all connected SSE clients
    clients.forEach(client => {
      client.res.write('data: ' + JSON.stringify({ type: 'notification', data: notification }) + '\n\n');
    });

    return notification;
  } catch (error) {
    console.error('[CreateNotification Error]', error.message);
  }
};

// Fetch all notification logs (max 50)
export const getNotificationHistory = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('[GetNotificationHistory Error]', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error('[MarkAsRead Error]', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    console.error('[MarkAllAsRead Error]', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete notification record
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('[DeleteNotification Error]', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
