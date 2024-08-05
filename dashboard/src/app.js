const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const creatorRoutes = require('./routes/creatorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const logger = require('./config/logger');
const dashboardRoutes = require ('./routes/dashboard');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use('/api/v1', dashboardRoutes)
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/creators', creatorRoutes);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/auth', authRoutes); // This route handles authentication

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
