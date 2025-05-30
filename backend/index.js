import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/dbConnection.js';
import userRoutes from './routes/user.routes.js';
import propertyRoutes from './routes/property.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
