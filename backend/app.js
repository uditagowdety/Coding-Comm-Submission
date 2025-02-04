const express = require('express');
const connectDB = require('./db/connectDB');
const authRoutes = require('./routes/auth');
const homepageRoutes = require('./routes/homePage');
const progressRoutes = require('./routes/userProgress');
const practiceRoutes = require('./routes/practiceRoutes');
const dashboardRoutes = require("./routes/dashRoutes");

const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/homepage', homepageRoutes);
app.use('/api/v1/user', progressRoutes);
app.use('/api/v1/practice', practiceRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve static files from the frontend build folder
/*const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Handle React routing (send index.html for any unknown routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});
*/

// Start Server
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
