const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const careerRoutes = require('./routes/careerRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const shortlistRoutes = require('./routes/shortlistRoutes');

const { seedDatabase, coursesData, careersData, assessmentQuestionsData } = require('./seed');
const Course = require('./models/Course');
const Career = require('./models/Career');
const AssessmentQuestion = require('./models/AssessmentQuestion');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/shortlist', shortlistRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  return res.json({
    success: true,
    message: 'CareerScope API is running',
  });
});

// Database connection & Server initialization
async function startServer() {
  let mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/careerscope';

  try {
    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('MongoDB connected successfully.');

    // Auto-seed initial course database if empty
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log('Course database is empty. Seeding initial courses...');
      const courseOps = coursesData.map(c => ({ updateOne: { filter: { name: c.name }, update: { $set: c }, upsert: true } }));
      const careerOps = careersData.map(c => ({ updateOne: { filter: { name: c.name }, update: { $set: c }, upsert: true } }));
      const questionOps = assessmentQuestionsData.map(q => ({ updateOne: { filter: { order: q.order }, update: { $set: q }, upsert: true } }));
      await Course.bulkWrite(courseOps);
      await Career.bulkWrite(careerOps);
      await AssessmentQuestion.bulkWrite(questionOps);
      console.log(`Seeded ${coursesData.length} courses into MongoDB database.`);
    }
  } catch (err) {
    console.warn('Local MongoDB connection failed. Launching in-memory MongoDB fallback...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      await mongoose.connect(mongoUri);
      console.log(`In-memory MongoDB connected successfully at ${mongoUri}`);

      // Seed in-memory database automatically if empty
      const courseCount = await Course.countDocuments();
      if (courseCount === 0) {
        console.log('Seeding initial data into in-memory database...');
        const courseOps = coursesData.map(c => ({ updateOne: { filter: { name: c.name }, update: { $set: c }, upsert: true } }));
        const careerOps = careersData.map(c => ({ updateOne: { filter: { name: c.name }, update: { $set: c }, upsert: true } }));
        const questionOps = assessmentQuestionsData.map(q => ({ updateOne: { filter: { order: q.order }, update: { $set: q }, upsert: true } }));
        await Course.bulkWrite(courseOps);
        await Career.bulkWrite(careerOps);
        await AssessmentQuestion.bulkWrite(questionOps);
        console.log('In-memory database seeded successfully!');
      }
    } catch (memErr) {
      console.error('Fatal: Could not connect to any MongoDB instance:', memErr.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`CareerScope Express server running on port ${PORT}`);
  });
}

startServer();
