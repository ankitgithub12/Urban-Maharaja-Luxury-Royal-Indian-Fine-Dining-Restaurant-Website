import React, { useState, useEffect } from 'react';
import { 
  FiLogOut as LogOut, 
  FiCalendar as Calendar, 
  FiUsers as Users, 
  FiMail as Mail, 
  FiFileText as FileText, 
  FiPlus as Plus, 
  FiSearch as Search, 
  FiTrash2 as Trash2, 
  FiEdit as Edit, 
  FiCheckCircle as CheckCircle2, 
  FiXCircle as XCircle, 
  FiAlertCircle as AlertCircle, 
  FiLoader as Loader2, 
  FiRefreshCw as RefreshCw, 
  FiFilter as Filter,
  FiBell as Bell,
  FiUser as User,
  FiCheck as Check
} from 'react-icons/fi';
import { HiSparkles as Sparkles } from 'react-icons/hi';
import { GiCrown as Crown } from 'react-icons/gi';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://urban-maharaja-luxury-royal-indian-fine.onrender.com/api';

const Dashboard = ({ navigate }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [admin, setAdmin] = useState(null);

  // Profile management state
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '' });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  // Notifications State
  const [notifications, setNotifications] = useState([]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  
  // UI Loading & Active State
  const [activeTab, setActiveTab] = useState('reservations');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Search & Filter State
  const [resSearch, setResSearch] = useState('');
  const [resFilterStatus, setResFilterStatus] = useState('all');
  const [resFilterZone, setResFilterZone] = useState('all');
  
  const [contactSearch, setContactSearch] = useState('');
  const [subSearch, setSubSearch] = useState('');

  // Modals & Drawers State
  const [showAddResModal, setShowAddResModal] = useState(false);
  const [showEditResModal, setShowEditResModal] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);
  const [newSubEmail, setNewSubEmail] = useState('');

  // New Reservation Form State
  const [resForm, setResForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '07:00 PM',
    guests: 2,
    seatingZone: 'No Preference',
    dietaryNotes: '',
    specialOccasion: 'None',
    status: 'confirmed'
  });

  // Check auth on load by validating current token
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      validateTokenAndBoot();
    }
  }, []);

  // Fetch data if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  // Real-time EventSource connection for notifications
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    let eventSource;
    let reconnectTimeout;

    const connectSSE = () => {
      eventSource = new EventSource(`${API_BASE_URL}/admin/notifications?token=${token}`);

      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          
          if (payload.type === 'notification') {
            // Append new notification to front
            setNotifications(prev => [payload.data, ...prev]);
            
            // Highlight notification alert
            showNotification('success', `Live Alert: ${payload.data.title}`);
            
            // Silently refresh stats and views
            silentRefreshData();
          }
        } catch (err) {
          console.error('[SSE message parse error]', err);
        }
      };

      eventSource.onerror = (err) => {
        console.error('[SSE connection error]', err);
        eventSource.close();
        
        // Reconnect logic after 5 seconds
        reconnectTimeout = setTimeout(() => {
          console.log('[SSE] Reconnecting to channel...');
          connectSSE();
        }, 5000);
      };
    };

    connectSSE();

    return () => {
      if (eventSource) eventSource.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [isAuthenticated]);

  const validateTokenAndBoot = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      if (response.status === 401) {
        handleLogout();
      } else {
        const data = await response.json();
        if (data.success) {
          setAdmin(data.admin);
          setProfileForm({
            name: data.admin.name,
            email: data.admin.email,
            phone: data.admin.phone
          });
          setIsAuthenticated(true);
        }
      }
    } catch (err) {
      console.error('[Token validation error]', err);
      // Fallback: stay authenticated if token is saved, but allow backend requests to check status
      setIsAuthenticated(true);
    }
  };

  // Secure API requests wrapper
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      handleLogout();
      throw new Error('Unauthenticated session');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };

    const response = await fetch(url, { ...options, headers });
    
    if (response.status === 401) {
      handleLogout();
      throw new Error('Session expired. Please log in again.');
    }

    return response;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        setAdmin(data.admin);
        setProfileForm({
          name: data.admin.name,
          email: data.admin.email,
          phone: data.admin.phone
        });
        setIsAuthenticated(true);
        setEmail('');
        setPassword('');
      } else {
        setLoginError(data.message || 'Incorrect email or password.');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Throne Server unreachable. Check backend terminal.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
    setNotifications([]);
    localStorage.removeItem('admin_token');
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      // Fetch Stats
      const statsRes = await authFetch(`${API_BASE_URL}/admin/stats`);
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);

      // Fetch Reservations
      const resRes = await authFetch(`${API_BASE_URL}/admin/reservations`);
      const resData = await resRes.json();
      if (resData.success) setReservations(resData.data);

      // Fetch Contacts
      const contactRes = await authFetch(`${API_BASE_URL}/admin/contacts`);
      const contactData = await contactRes.json();
      if (contactData.success) setContacts(contactData.data);

      // Fetch Subscribers
      const subRes = await authFetch(`${API_BASE_URL}/admin/subscribers`);
      const subData = await subRes.json();
      if (subData.success) setSubscribers(subData.data);

      // Fetch Notifications Logs
      const notifRes = await authFetch(`${API_BASE_URL}/admin/notifications/history`);
      const notifData = await notifRes.json();
      if (notifData.success) setNotifications(notifData.notifications);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Could not fetch server records. Please verify database connection.');
    } finally {
      setLoading(false);
    }
  };

  // Silent refresh data for background updates (SSE triggered)
  const silentRefreshData = async () => {
    try {
      const statsRes = await authFetch(`${API_BASE_URL}/admin/stats`);
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);

      const resRes = await authFetch(`${API_BASE_URL}/admin/reservations`);
      const resData = await resRes.json();
      if (resData.success) setReservations(resData.data);

      const contactRes = await authFetch(`${API_BASE_URL}/admin/contacts`);
      const contactData = await contactRes.json();
      if (contactData.success) setContacts(contactData.data);

      const subRes = await authFetch(`${API_BASE_URL}/admin/subscribers`);
      const subData = await subRes.json();
      if (subData.success) setSubscribers(subData.data);
    } catch (err) {
      console.warn('[SSE Background refresh error]', err.message);
    }
  };

  const showNotification = (type, message) => {
    if (type === 'success') {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(''), 4000);
    } else {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 4000);
    }
  };

  // CRUD Actions
  const handleUpdateStatus = async (id, status) => {
    setActionLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/reservations/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', `Reservation status changed to ${status}`);
        fetchDashboardData();
      } else {
        showNotification('error', data.message || 'Failed to update reservation');
      }
    } catch (err) {
      showNotification('error', err.message || 'Network failure updating reservation');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteRes = async (id) => {
    if (!confirm('Are you absolutely sure you want to permanently delete this reservation?')) return;
    setActionLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/reservations/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', 'Reservation deleted');
        fetchDashboardData();
      } else {
        showNotification('error', data.message || 'Failed to delete reservation');
      }
    } catch (err) {
      showNotification('error', err.message || 'Network error deleting reservation');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateRes = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/reservations`, {
        method: 'POST',
        body: JSON.stringify(resForm)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', 'New reservation added successfully');
        setShowAddResModal(false);
        setResForm({
          name: '',
          email: '',
          phone: '',
          date: '',
          timeSlot: '07:00 PM',
          guests: 2,
          seatingZone: 'No Preference',
          dietaryNotes: '',
          specialOccasion: 'None',
          status: 'confirmed'
        });
        fetchDashboardData();
      } else {
        showNotification('error', data.message || 'Failed to create reservation');
      }
    } catch (err) {
      showNotification('error', err.message || 'Network error creating reservation');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditRes = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/reservations/${selectedRes._id}`, {
        method: 'PUT',
        body: JSON.stringify(selectedRes)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', 'Reservation modified successfully');
        setShowEditResModal(false);
        setSelectedRes(null);
        fetchDashboardData();
      } else {
        showNotification('error', data.message || 'Failed to edit reservation');
      }
    } catch (err) {
      showNotification('error', err.message || 'Network error saving reservation changes');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!confirm('Delete this inquiry permanently?')) return;
    setActionLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/contacts/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', 'Inquiry deleted');
        fetchDashboardData();
      }
    } catch (err) {
      showNotification('error', err.message || 'Network error deleting inquiry');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddSubscriber = async (e) => {
    e.preventDefault();
    if (!newSubEmail) return;
    setActionLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/subscribers`, {
        method: 'POST',
        body: JSON.stringify({ email: newSubEmail })
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', 'Newsletter subscriber added');
        setNewSubEmail('');
        fetchDashboardData();
      } else {
        showNotification('error', data.message || 'Failed to add subscriber');
      }
    } catch (err) {
      showNotification('error', err.message || 'Network error adding subscriber');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSubscriber = async (id) => {
    if (!confirm('Unsubscribe this client from the newsletter list?')) return;
    setActionLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/subscribers/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', 'Subscriber removed');
        fetchDashboardData();
      }
    } catch (err) {
      showNotification('error', err.message || 'Network error removing subscriber');
    } finally {
      setActionLoading(false);
    }
  };

  // Profile Settings Actions
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/profile`, {
        method: 'PUT',
        body: JSON.stringify({
          name: profileForm.name,
          email: profileForm.email,
          phone: profileForm.phone
        })
      });
      const data = await res.json();
      if (data.success) {
        setAdmin(data.admin);
        showNotification('success', 'Palace profile updated successfully');
      } else {
        showNotification('error', data.message || 'Failed to update profile info');
      }
    } catch (err) {
      showNotification('error', err.message || 'Server error updating profile details');
    } finally {
      setActionLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showNotification('error', 'New credentials verification mismatch.');
      return;
    }
    setActionLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/profile`, {
        method: 'PUT',
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', 'Administrative password changed successfully.');
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showNotification('error', data.message || 'Password update declined.');
      }
    } catch (err) {
      showNotification('error', err.message || 'Server connection error during credentials reset.');
    } finally {
      setActionLoading(false);
    }
  };

  // Notification Feed Actions
  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/notifications/${id}/read`, {
        method: 'PUT'
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/notifications/read-all`, {
        method: 'PUT'
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        showNotification('success', 'All notification feeds marked as read');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNotification = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/notifications/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(prev => prev.filter(n => n._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered lists
  const filteredReservations = reservations.filter(res => {
    const query = resSearch.toLowerCase();
    const matchesSearch = 
      res.name.toLowerCase().includes(query) ||
      res.email.toLowerCase().includes(query) ||
      res.phone.includes(query) ||
      res.bookingCode.toLowerCase().includes(query);

    const matchesStatus = resFilterStatus === 'all' || res.status === resFilterStatus;
    const matchesZone = resFilterZone === 'all' || res.seatingZone === resFilterZone;

    return matchesSearch && matchesStatus && matchesZone;
  });

  const filteredContacts = contacts.filter(c => {
    const query = contactSearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.message.toLowerCase().includes(query) ||
      c.subject.toLowerCase().includes(query)
    );
  });

  const filteredSubscribers = subscribers.filter(s => {
    return s.email.toLowerCase().includes(subSearch.toLowerCase());
  });

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Authenticate UI Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050C1A] text-[#FDFBF7] flex items-center justify-center font-sans p-6" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #0d1b3e 0%, #050C1A 100%)' }}>
        <div className="max-w-md w-full glass-panel p-8 border border-gold/25 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />

          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <Crown className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-widest text-gold-light uppercase">
              Imperial Court <br />
              <span className="text-gold">Admin Portal</span>
            </h1>
            <p className="text-xs text-gold-light/60 mt-2 uppercase tracking-widest">Secure Access Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1.5 font-medium">Sovereign Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@urbanmaharaja.com"
                className="w-full bg-[#050C1A] border border-gold/20 focus:border-gold/60 px-4 py-3 text-gold-light text-sm outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-gold mb-1.5 font-medium">Admin Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#050C1A] border border-gold/20 focus:border-gold/60 px-4 py-3 text-gold-light text-sm outline-none transition-colors"
              />
            </div>

            {loginError && (
              <div className="text-red-500 text-xs flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 p-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold-shimmer w-full py-3.5 text-xs font-bold tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-3 h-3 animate-spin" />}
              Sign In to Throne Room
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-center text-xs text-gold-light/50 hover:text-gold transition-colors pt-2 uppercase tracking-widest"
            >
              Return to Dining Court
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Main UI Page
  return (
    <div className="min-h-screen bg-[#050C1A] text-[#FDFBF7] font-sans flex flex-col">
      {/* Top Banner Header */}
      <header className="border-b border-gold/15 bg-[#030811] py-4 px-6 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Crown className="w-7 h-7 text-gold" />
            <h1 className="font-serif text-lg md:text-xl font-bold tracking-widest text-gold-light">
              URBAN <span className="text-gold">MAHARAJA</span>
              <span className="text-[10px] tracking-widest bg-gold/10 text-gold px-2 py-0.5 ml-2.5 border border-gold/20 uppercase font-sans">Admin Hub</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Real-time Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                className="p-2 border border-gold/10 hover:border-gold/30 text-gold-light/80 hover:text-gold transition-colors flex items-center justify-center cursor-pointer relative"
                title="Notifications Log"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-gold text-[#050C1A] text-[9px] font-bold rounded-full flex items-center justify-center badge-pulse">
                    {unreadNotifCount}
                  </span>
                )}
              </button>
              
              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-3 w-80 glass-panel border border-gold/25 z-50 shadow-2xl max-h-[400px] flex flex-col animate-fade-up">
                  <div className="p-3 border-b border-gold/15 flex items-center justify-between bg-[#030811]/90">
                    <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">Palace Alert Feed</span>
                    {unreadNotifCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-[9px] text-gold-light/60 hover:text-gold uppercase tracking-wider font-semibold"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  
                  <div className="overflow-y-auto flex-grow divide-y divide-gold/10">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-[10px] text-gold-light/45 uppercase tracking-widest">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n._id} 
                          onClick={(e) => {
                            handleMarkAsRead(n._id, e);
                            if (n.type === 'reservation') setActiveTab('reservations');
                            else if (n.type === 'contact') setActiveTab('contacts');
                            else if (n.type === 'subscriber') setActiveTab('subscribers');
                            setShowNotificationsDropdown(false);
                          }}
                          className={`p-3 text-left transition-colors cursor-pointer flex gap-3 hover:bg-gold/5 ${!n.read ? 'bg-gold/3' : ''}`}
                        >
                          <div className="mt-0.5 text-gold flex-shrink-0">
                            {n.type === 'reservation' && <Calendar className="w-3.5 h-3.5" />}
                            {n.type === 'contact' && <Mail className="w-3.5 h-3.5" />}
                            {n.type === 'subscriber' && <Users className="w-3.5 h-3.5" />}
                            {n.type === 'system' && <AlertCircle className="w-3.5 h-3.5" />}
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start gap-1">
                              <p className={`text-[11px] font-semibold truncate ${!n.read ? 'text-gold-light' : 'text-gold-light/60'}`}>{n.title}</p>
                              <span className="text-[8px] text-gold-light/40 uppercase whitespace-nowrap">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="text-[10px] text-gold-light/70 mt-0.5 line-clamp-2 leading-relaxed">{n.message}</p>
                            
                            <div className="flex items-center justify-between mt-2">
                              {!n.read ? (
                                <button
                                  onClick={(e) => handleMarkAsRead(n._id, e)}
                                  className="text-[9px] text-emerald-400 hover:text-emerald-300 font-medium uppercase tracking-wider flex items-center gap-0.5"
                                >
                                  <Check className="w-2.5 h-2.5" /> Mark read
                                </button>
                              ) : (
                                <span className="text-[9px] text-gold-light/40 font-medium uppercase">Read</span>
                              )}
                              <button
                                onClick={(e) => handleDeleteNotification(n._id, e)}
                                className="text-[9px] text-gold-light/45 hover:text-red-400 font-medium uppercase tracking-wider"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="p-2 border border-gold/10 hover:border-gold/30 text-gold-light/80 hover:text-gold transition-colors flex items-center justify-center cursor-pointer"
              title="Sync Palace Database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gold/25 text-gold hover:text-gold-light hover:border-gold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              View Website
            </button>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-950/40 border border-red-500/20 hover:bg-red-900/40 hover:border-red-500 text-red-400 hover:text-red-300 text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit Hub
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 space-y-8">
        
        {/* Status notification toast */}
        {successMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 text-xs tracking-wider flex items-center gap-2 fixed bottom-6 right-6 z-50 shadow-xl max-w-sm animate-fade-up">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 text-xs tracking-wider flex items-center gap-2 fixed bottom-6 right-6 z-50 shadow-xl max-w-sm animate-fade-up">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Statistics Widgets Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-5 border border-gold/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gold uppercase tracking-widest block mb-1">Today's Dining Hostings</span>
              <span className="font-serif text-3xl font-bold text-gold-light">{stats ? stats.todayCount : '0'}</span>
              <span className="text-[10px] text-gold-light/45 block mt-1">{stats ? stats.todayGuests : '0'} Expected Guests</span>
            </div>
            <div className="p-3 bg-gold/5 border border-gold/20 text-gold">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-panel p-5 border border-gold/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gold uppercase tracking-widest block mb-1">Pending Approval Queue</span>
              <span className="font-serif text-3xl font-bold text-gold-light">{stats ? stats.pendingCount : '0'}</span>
              <span className="text-[10px] text-gold-light/45 block mt-1">Requires Confirmation</span>
            </div>
            <div className="p-3 bg-amber-500/5 border border-amber-500/20 text-amber-400">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-panel p-5 border border-gold/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gold uppercase tracking-widest block mb-1">Contact inquiries</span>
              <span className="font-serif text-3xl font-bold text-gold-light">{stats ? stats.totalContacts : '0'}</span>
              <span className="text-[10px] text-gold-light/45 block mt-1">Customer queries log</span>
            </div>
            <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 text-cyan-400">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-panel p-5 border border-gold/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gold uppercase tracking-widest block mb-1">Maharaja club members</span>
              <span className="font-serif text-3xl font-bold text-gold-light">{stats ? stats.totalSubscribers : '0'}</span>
              <span className="text-[10px] text-gold-light/45 block mt-1">Newsletter list registry</span>
            </div>
            <div className="p-3 bg-purple-500/5 border border-purple-500/20 text-purple-400">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Tab Controls */}
        <div className="flex border-b border-gold/15 gap-4">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`pb-3 text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer ${
              activeTab === 'reservations' 
                ? 'border-b-2 border-gold text-gold font-bold' 
                : 'text-gold-light/60 hover:text-gold-light'
            }`}
          >
            Reservations List
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`pb-3 text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer ${
              activeTab === 'contacts' 
                ? 'border-b-2 border-gold text-gold font-bold' 
                : 'text-gold-light/60 hover:text-gold-light'
            }`}
          >
            Palace Inquiries
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`pb-3 text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer ${
              activeTab === 'subscribers' 
                ? 'border-b-2 border-gold text-gold font-bold' 
                : 'text-gold-light/60 hover:text-gold-light'
            }`}
          >
            Newsletter Subscribers
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer ${
              activeTab === 'profile' 
                ? 'border-b-2 border-gold text-gold font-bold' 
                : 'text-gold-light/60 hover:text-gold-light'
            }`}
          >
            Admin Profile
          </button>
        </div>

        {/* Tab Contents */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gold-light/60 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-gold" />
            <p className="text-xs uppercase tracking-widest">Consulting Palace Scrolls...</p>
          </div>
        ) : (
          <div>
            {/* RESERVATIONS TAB */}
            {activeTab === 'reservations' && (
              <div className="space-y-6">
                
                {/* Filters and search panel */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#030811]/60 p-4 border border-gold/10">
                  {/* Search box */}
                  <div className="relative flex-grow max-w-md">
                    <Search className="w-4 h-4 text-gold/60 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={resSearch}
                      onChange={(e) => setResSearch(e.target.value)}
                      placeholder="Search by client name, email, code or phone..."
                      className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 pl-10 pr-4 py-2.5 text-xs text-gold-light outline-none"
                    />
                  </div>

                  {/* Filter boxes */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-gold/60" />
                      <span className="text-[10px] text-gold-light/50 uppercase tracking-wider">Status:</span>
                      <select
                        value={resFilterStatus}
                        onChange={(e) => setResFilterStatus(e.target.value)}
                        className="bg-[#050C1A] border border-gold/15 text-xs text-gold-light px-3 py-2 outline-none focus:border-gold/50"
                      >
                        <option value="all">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gold-light/50 uppercase tracking-wider">Zone:</span>
                      <select
                        value={resFilterZone}
                        onChange={(e) => setResFilterZone(e.target.value)}
                        className="bg-[#050C1A] border border-gold/15 text-xs text-gold-light px-3 py-2 outline-none focus:border-gold/50"
                      >
                        <option value="all">All Seating Zones</option>
                        <option value="No Preference">No Preference</option>
                        <option value="Main Darbar">Main Darbar</option>
                        <option value="Diwan-i-Khas (Private Suite)">Diwan-i-Khas</option>
                        <option value="Peacock Pavilion (Al Fresco)">Peacock Pavilion</option>
                        <option value="Sheesh Mahal (Glass Room)">Sheesh Mahal</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setShowAddResModal(true)}
                      className="btn-gold-shimmer px-4 py-2 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Book Table
                    </button>
                  </div>
                </div>

                {/* Table list */}
                <div className="glass-panel overflow-x-auto border border-gold/10">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#030811]/80 border-b border-gold/15 text-gold uppercase tracking-widest text-[9px] font-bold">
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Dining Date & Slot</th>
                        <th className="p-4 text-center">Guests</th>
                        <th className="p-4">Zone / Occasion</th>
                        <th className="p-4">Booking Code</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/10 font-light text-gold-light/80">
                      {filteredReservations.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="p-8 text-center text-gold-light/45 uppercase tracking-widest">
                            No reservations found matching active filters.
                          </td>
                        </tr>
                      ) : (
                        filteredReservations.map(res => (
                          <tr key={res._id} className="hover:bg-gold/5 transition-colors">
                            <td className="p-4">
                              <div className="font-semibold text-gold-light">{res.name}</div>
                              <div className="text-[10px] text-gold-light/50 mt-0.5">{res.email}</div>
                              <div className="text-[10px] text-gold-light/50">{res.phone}</div>
                            </td>
                            <td className="p-4">
                              <div>{new Date(res.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                              <div className="text-[10px] text-gold mt-0.5 font-medium">{res.timeSlot}</div>
                            </td>
                            <td className="p-4 text-center font-serif text-sm font-bold text-gold-light">
                              {res.guests}
                            </td>
                            <td className="p-4">
                              <div className="text-[10px] uppercase font-sans tracking-wide text-gold">{res.seatingZone}</div>
                              {res.specialOccasion && res.specialOccasion !== 'None' && (
                                <div className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider bg-gold/10 text-gold-light border border-gold/25 px-1.5 py-0.5 mt-1">
                                  <Sparkles className="w-2 h-2 text-gold" />
                                  {res.specialOccasion}
                                </div>
                              )}
                              {res.dietaryNotes && (
                                <div className="text-[10px] text-amber-500/70 truncate max-w-xs mt-1" title={res.dietaryNotes}>
                                  Note: {res.dietaryNotes}
                                </div>
                              )}
                            </td>
                            <td className="p-4 font-mono text-[10px] text-gold-light/60">
                              {res.bookingCode}
                            </td>
                            <td className="p-4 text-center">
                              <span className={`px-2 py-1 text-[9px] uppercase tracking-widest font-bold border ${
                                res.status === 'confirmed' 
                                  ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' 
                                  : res.status === 'pending'
                                  ? 'bg-amber-500/5 text-amber-400 border-amber-500/20'
                                  : 'bg-red-500/5 text-red-400 border-red-500/20'
                              }`}>
                                {res.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {res.status !== 'confirmed' && (
                                  <button
                                    onClick={() => handleUpdateStatus(res._id, 'confirmed')}
                                    disabled={actionLoading}
                                    className="p-1.5 border border-emerald-500/20 hover:border-emerald-500 bg-emerald-500/5 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                                    title="Confirm Booking"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {res.status !== 'cancelled' && (
                                  <button
                                    onClick={() => handleUpdateStatus(res._id, 'cancelled')}
                                    disabled={actionLoading}
                                    className="p-1.5 border border-red-500/20 hover:border-red-500 bg-red-500/5 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                    title="Cancel Booking"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    const formattedDate = new Date(res.date).toISOString().slice(0, 10);
                                    setSelectedRes({ ...res, date: formattedDate });
                                    setShowEditResModal(true);
                                  }}
                                  className="p-1.5 border border-gold/25 hover:border-gold bg-gold/5 text-gold hover:text-[#050C1A] transition-colors cursor-pointer"
                                  title="Edit Booking"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteRes(res._id)}
                                  disabled={actionLoading}
                                  className="p-1.5 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CONTACT INQUIRIES TAB */}
            {activeTab === 'contacts' && (
              <div className="space-y-6">
                
                {/* Search Bar */}
                <div className="bg-[#030811]/60 p-4 border border-gold/10">
                  <div className="relative max-w-md">
                    <Search className="w-4 h-4 text-gold/60 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={contactSearch}
                      onChange={(e) => setContactSearch(e.target.value)}
                      placeholder="Search contacts by name, email, subject or message..."
                      className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 pl-10 pr-4 py-2.5 text-xs text-gold-light outline-none"
                    />
                  </div>
                </div>

                {/* Contacts grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredContacts.length === 0 ? (
                    <div className="md:col-span-2 glass-panel p-10 text-center text-gold-light/45 uppercase tracking-widest border border-gold/10">
                      No customer message records found.
                    </div>
                  ) : (
                    filteredContacts.map(c => (
                      <div key={c._id} className="glass-panel p-6 border border-gold/10 relative flex flex-col justify-between hover:border-gold/30 transition-all duration-300 font-light text-gold-light/80">
                        <button
                          onClick={() => handleDeleteContact(c._id)}
                          className="absolute top-4 right-4 text-gold-light/45 hover:text-red-400 transition-colors p-1"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div>
                          <div className="flex justify-between items-start mb-3 pr-6">
                            <div>
                              <h3 className="font-serif text-base text-gold-light font-bold">{c.name}</h3>
                              <p className="text-[10px] text-gold-light/50">{c.email} {c.phone && `| ${c.phone}`}</p>
                            </div>
                          </div>
                          
                          <div className="border-t border-gold/10 pt-3 mt-3">
                            <span className="text-[10px] text-gold uppercase tracking-widest block font-medium mb-1">Subject: {c.subject}</span>
                            <p className="text-xs text-gold-light/80 leading-relaxed font-light whitespace-pre-line italic">
                              "{c.message}"
                            </p>
                          </div>
                        </div>

                        <div className="text-[9px] text-gold-light/45 uppercase tracking-widest mt-6 border-t border-gold/10 pt-3 text-right">
                          Received: {new Date(c.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SUBSCRIBERS TAB */}
            {activeTab === 'subscribers' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Add subscriber */}
                <div className="lg:col-span-4 glass-panel p-6 border border-gold/10 space-y-6">
                  <div className="border-b border-gold/10 pb-3">
                    <h3 className="font-serif text-base text-gold font-semibold uppercase">Add Club Member</h3>
                    <p className="text-[10px] text-gold-light/65">Manually register an email to the Maharaja Club list.</p>
                  </div>

                  <form onSubmit={handleAddSubscriber} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={newSubEmail}
                        onChange={(e) => setNewSubEmail(e.target.value)}
                        placeholder="vip-guest@example.com"
                        className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3.5 py-2.5 text-xs text-gold-light outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="btn-gold-shimmer w-full py-2.5 text-xs font-semibold tracking-widest uppercase cursor-pointer"
                    >
                      Subscribe Email
                    </button>
                  </form>
                </div>

                {/* Right: Subscribers table */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-[#030811]/60 p-4 border border-gold/10">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gold/60 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={subSearch}
                        onChange={(e) => setSubSearch(e.target.value)}
                        placeholder="Search subscriber email address..."
                        className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 pl-10 pr-4 py-2.5 text-xs text-gold-light outline-none"
                      />
                    </div>
                  </div>

                  <div className="glass-panel border border-gold/10 overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#030811]/85 border-b border-gold/15 text-gold uppercase tracking-widest text-[9px] font-bold">
                          <th className="p-4">Email Address</th>
                          <th className="p-4">Date Joined</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold/10 font-light text-gold-light/80">
                        {filteredSubscribers.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="p-6 text-center text-gold-light/45 uppercase tracking-widest">
                              No subscribers found.
                            </td>
                          </tr>
                        ) : (
                          filteredSubscribers.map(sub => (
                            <tr key={sub._id} className="hover:bg-gold/5 transition-colors">
                              <td className="p-4 font-medium text-gold-light">
                                {sub.email}
                              </td>
                              <td className="p-4 text-gold-light/60">
                                {new Date(sub.createdAt).toLocaleString()}
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => handleDeleteSubscriber(sub._id)}
                                  className="p-1 text-gold-light/45 hover:text-red-400 transition-colors cursor-pointer"
                                  title="Unsubscribe Member"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE SETTINGS TAB */}
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Profile Info Card */}
                <div className="lg:col-span-4 glass-panel p-6 border border-gold/10 flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full border-2 border-gold flex items-center justify-center bg-gold/5 relative overflow-hidden">
                    <User className="w-12 h-12 text-gold animate-pulse-slow" />
                    <div className="absolute bottom-0 inset-x-0 bg-gold/20 py-0.5 text-[8px] text-gold uppercase tracking-widest font-bold">
                      {admin?.role || 'Admin'}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-gold-light">{admin?.name || 'Sovereign Administrator'}</h3>
                    <p className="text-xs text-gold uppercase tracking-widest font-medium mt-1">{admin?.role || 'Palace Administrator'}</p>
                  </div>

                  <div className="w-full border-t border-gold/10 pt-4 text-xs text-left space-y-2.5 text-gold-light/80 font-light">
                    <div>
                      <span className="text-[10px] text-gold uppercase tracking-widest font-medium block">Mailbox</span>
                      <span>{admin?.email}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gold uppercase tracking-widest font-medium block">Phone Registry</span>
                      <span>{admin?.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Right Profile Form fields */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Account detail editor */}
                  <div className="glass-panel p-6 border border-gold/10 space-y-6">
                    <div className="border-b border-gold/10 pb-3">
                      <h3 className="font-serif text-base text-gold font-semibold uppercase">Profile Settings</h3>
                      <p className="text-[10px] text-gold-light/65">Alter administrative contact information.</p>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Administrative Name</label>
                          <input
                            type="text" required
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            placeholder="Administrator Name"
                            className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3.5 py-2.5 text-xs text-gold-light outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Contact Phone</label>
                          <input
                            type="text" required
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            placeholder="Phone Number"
                            className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3.5 py-2.5 text-xs text-gold-light outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Email Address</label>
                        <input
                          type="email" required
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          placeholder="admin@urbanmaharaja.com"
                          className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3.5 py-2.5 text-xs text-gold-light outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="btn-gold-shimmer px-6 py-2.5 text-xs font-semibold tracking-widest uppercase cursor-pointer"
                      >
                        Save Settings
                      </button>
                    </form>
                  </div>

                  {/* Password modifier */}
                  <div className="glass-panel p-6 border border-gold/10 space-y-6">
                    <div className="border-b border-gold/10 pb-3">
                      <h3 className="font-serif text-base text-gold font-semibold uppercase">Change Portal Password</h3>
                      <p className="text-[10px] text-gold-light/65">Change your credentials for admin login access.</p>
                    </div>

                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Current Password</label>
                        <input
                          type="password" required
                          value={passwordForm.oldPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                          placeholder="Enter current password"
                          className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3.5 py-2.5 text-xs text-gold-light outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">New Password</label>
                          <input
                            type="password" required
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            placeholder="At least 6 characters"
                            className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3.5 py-2.5 text-xs text-gold-light outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Confirm New Password</label>
                          <input
                            type="password" required
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            placeholder="Confirm new password"
                            className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3.5 py-2.5 text-xs text-gold-light outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="btn-gold-shimmer px-6 py-2.5 text-xs font-semibold tracking-widest uppercase cursor-pointer"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* CREATE RESERVATION MODAL */}
      {showAddResModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="glass-panel max-w-lg w-full p-6 border border-gold/25 relative flex flex-col max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg text-gold font-bold uppercase mb-4">Book Dining Table (Palace Walk-In)</h3>
            
            <form onSubmit={handleCreateRes} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Customer Name</label>
                  <input
                    type="text" required
                    value={resForm.name}
                    onChange={(e) => setResForm({...resForm, name: e.target.value})}
                    placeholder="Guest Name"
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Contact Phone</label>
                  <input
                    type="text" required
                    value={resForm.phone}
                    onChange={(e) => setResForm({...resForm, phone: e.target.value})}
                    placeholder="Phone number"
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Email Address</label>
                <input
                  type="email" required
                  value={resForm.email}
                  onChange={(e) => setResForm({...resForm, email: e.target.value})}
                  placeholder="customer@example.com"
                  className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Dining Date</label>
                  <input
                    type="date" required
                    value={resForm.date}
                    onChange={(e) => setResForm({...resForm, date: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Time Slot</label>
                  <select
                    value={resForm.timeSlot}
                    onChange={(e) => setResForm({...resForm, timeSlot: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  >
                    <option value="12:00 PM">12:00 PM (Lunch)</option>
                    <option value="01:30 PM">01:30 PM (Lunch)</option>
                    <option value="07:00 PM">07:00 PM (Dinner)</option>
                    <option value="08:30 PM">08:30 PM (Dinner)</option>
                    <option value="10:00 PM">10:00 PM (Late Dinner)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Guests</label>
                  <input
                    type="number" min="1" max="20" required
                    value={resForm.guests}
                    onChange={(e) => setResForm({...resForm, guests: parseInt(e.target.value, 10)})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Seating Zone</label>
                  <select
                    value={resForm.seatingZone}
                    onChange={(e) => setResForm({...resForm, seatingZone: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  >
                    <option value="No Preference">No Preference</option>
                    <option value="Main Darbar">Main Darbar</option>
                    <option value="Diwan-i-Khas (Private Suite)">Diwan-i-Khas</option>
                    <option value="Peacock Pavilion (Al Fresco)">Peacock Pavilion</option>
                    <option value="Sheesh Mahal (Glass Room)">Sheesh Mahal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Special Occasion</label>
                  <select
                    value={resForm.specialOccasion}
                    onChange={(e) => setResForm({...resForm, specialOccasion: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  >
                    <option value="None">None</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Business Dinner">Business Dinner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Dietary/Special Notes</label>
                <textarea
                  value={resForm.dietaryNotes}
                  onChange={(e) => setResForm({...resForm, dietaryNotes: e.target.value})}
                  placeholder="Allergies, wheelchair access, high chair requirements..."
                  rows="2"
                  className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gold/10 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddResModal(false)}
                  className="px-4 py-2 border border-gold/20 hover:border-gold text-gold-light/60 hover:text-gold text-xs uppercase tracking-widest font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="btn-gold-shimmer px-6 py-2 text-xs uppercase tracking-widest font-semibold cursor-pointer"
                >
                  Create Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT RESERVATION MODAL */}
      {showEditResModal && selectedRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="glass-panel max-w-lg w-full p-6 border border-gold/25 relative flex flex-col max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg text-gold font-bold uppercase mb-4">Edit Reservation Record</h3>
            
            <form onSubmit={handleEditRes} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Customer Name</label>
                  <input
                    type="text" required
                    value={selectedRes.name}
                    onChange={(e) => setSelectedRes({...selectedRes, name: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Contact Phone</label>
                  <input
                    type="text" required
                    value={selectedRes.phone}
                    onChange={(e) => setSelectedRes({...selectedRes, phone: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Email Address</label>
                <input
                  type="email" required
                  value={selectedRes.email}
                  onChange={(e) => setSelectedRes({...selectedRes, email: e.target.value})}
                  className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Dining Date</label>
                  <input
                    type="date" required
                    value={selectedRes.date}
                    onChange={(e) => setSelectedRes({...selectedRes, date: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Time Slot</label>
                  <select
                    value={selectedRes.timeSlot}
                    onChange={(e) => setSelectedRes({...selectedRes, timeSlot: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  >
                    <option value="12:00 PM">12:00 PM (Lunch)</option>
                    <option value="01:30 PM">01:30 PM (Lunch)</option>
                    <option value="07:00 PM">07:00 PM (Dinner)</option>
                    <option value="08:30 PM">08:30 PM (Dinner)</option>
                    <option value="10:00 PM">10:00 PM (Late Dinner)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Guests</label>
                  <input
                    type="number" min="1" max="20" required
                    value={selectedRes.guests}
                    onChange={(e) => setSelectedRes({...selectedRes, guests: parseInt(e.target.value, 10)})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Seating Zone</label>
                  <select
                    value={selectedRes.seatingZone}
                    onChange={(e) => setSelectedRes({...selectedRes, seatingZone: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  >
                    <option value="No Preference">No Preference</option>
                    <option value="Main Darbar">Main Darbar</option>
                    <option value="Diwan-i-Khas (Private Suite)">Diwan-i-Khas</option>
                    <option value="Peacock Pavilion (Al Fresco)">Peacock Pavilion</option>
                    <option value="Sheesh Mahal (Glass Room)">Sheesh Mahal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Special Occasion</label>
                  <select
                    value={selectedRes.specialOccasion}
                    onChange={(e) => setSelectedRes({...selectedRes, specialOccasion: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  >
                    <option value="None">None</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Business Dinner">Business Dinner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Status</label>
                  <select
                    value={selectedRes.status}
                    onChange={(e) => setSelectedRes({...selectedRes, status: e.target.value})}
                    className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gold-light/70 mb-1">Dietary/Special Notes</label>
                <textarea
                  value={selectedRes.dietaryNotes || ''}
                  onChange={(e) => setSelectedRes({...selectedRes, dietaryNotes: e.target.value})}
                  rows="2"
                  className="w-full bg-[#050C1A] border border-gold/15 focus:border-gold/50 px-3 py-2 text-xs text-gold-light outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gold/10 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditResModal(false);
                    setSelectedRes(null);
                  }}
                  className="px-4 py-2 border border-gold/20 hover:border-gold text-gold-light/60 hover:text-gold text-xs uppercase tracking-widest font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="btn-gold-shimmer px-6 py-2 text-xs uppercase tracking-widest font-semibold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <footer className="border-t border-gold/10 bg-[#030811] py-4 px-6 text-center text-[10px] uppercase tracking-widest text-gold-light/45">
        &copy; {new Date().getFullYear()} Urban Maharaja. Sovereign Administrative Access Control.
      </footer>
    </div>
  );
};

export default Dashboard;
