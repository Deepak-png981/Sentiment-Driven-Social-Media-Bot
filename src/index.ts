import express from 'express';
// import mongoose from 'mongoose';
import { config } from './config/config';
import instagramRoutes from './routes/instagramRoutes';
import logger from './utils/logger';

const app = express();

app.use(express.json());

app.use('/instagram', instagramRoutes);

// mongoose.connect(config.mongoURI)
//   .then(() => logger.info('Connected to MongoDB'))
//   .catch(err => logger.error(`MongoDB connection error: ${err}`));


app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
