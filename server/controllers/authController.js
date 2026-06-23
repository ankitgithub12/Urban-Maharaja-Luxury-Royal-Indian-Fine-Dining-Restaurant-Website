import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

// Helper to update environment file programmatically
const updateEnvFile = (updates) => {
  try {
    if (!fs.existsSync(envPath)) return false;
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    for (const [key, value] of Object.entries(updates)) {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${key}=${value}`);
      } else {
        envContent += `\n${key}=${value}`;
      }
      // Instantly update runtime env so it takes effect immediately
      process.env[key] = value;
    }
    
    fs.writeFileSync(envPath, envContent, 'utf8');
    return true;
  } catch (error) {
    console.error('Error updating .env file:', error);
    return false;
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@urbanmaharaja.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'MaharajaAdmin@2026';

    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    let isMatch = false;
    if (adminPassword.startsWith('$2a$') || adminPassword.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, adminPassword);
    } else {
      isMatch = (password === adminPassword);
      // Automatically hash the plaintext password and update the .env file for future logins
      if (isMatch) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateEnvFile({ ADMIN_PASSWORD: hashedPassword });
      }
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: adminEmail, name: process.env.ADMIN_NAME || 'Royal Administrator', role: 'admin' },
      process.env.JWT_SECRET || 'UrbanMaharaja_S3cr3t_K3y_2026_R0yal',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        name: process.env.ADMIN_NAME || 'Royal Administrator',
        email: adminEmail,
        phone: process.env.ADMIN_PHONE || '+91 98765 43210',
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('[Login Controller Error]', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: {
        name: process.env.ADMIN_NAME || 'Royal Administrator',
        email: process.env.ADMIN_EMAIL || 'admin@urbanmaharaja.com',
        phone: process.env.ADMIN_PHONE || '+91 98765 43210',
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('[GetProfile Controller Error]', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, oldPassword, newPassword } = req.body;
    const updates = {};

    if (name) updates.ADMIN_NAME = name;
    if (email) updates.ADMIN_EMAIL = email;
    if (phone) updates.ADMIN_PHONE = phone;

    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({ success: false, message: 'Current password is required to set a new password' });
      }

      const adminPassword = process.env.ADMIN_PASSWORD || 'MaharajaAdmin@2026';
      let isMatch = false;
      if (adminPassword.startsWith('$2a$') || adminPassword.startsWith('$2b$')) {
        isMatch = await bcrypt.compare(oldPassword, adminPassword);
      } else {
        isMatch = (oldPassword === adminPassword);
      }

      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Incorrect current password' });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long' });
      }

      const salt = await bcrypt.genSalt(10);
      updates.ADMIN_PASSWORD = await bcrypt.hash(newPassword, salt);
    }

    if (Object.keys(updates).length > 0) {
      const success = updateEnvFile(updates);
      if (!success) {
        return res.status(500).json({ success: false, message: 'Failed to update admin profile settings' });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        name: process.env.ADMIN_NAME || 'Royal Administrator',
        email: process.env.ADMIN_EMAIL || 'admin@urbanmaharaja.com',
        phone: process.env.ADMIN_PHONE || '+91 98765 43210',
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('[UpdateProfile Controller Error]', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
