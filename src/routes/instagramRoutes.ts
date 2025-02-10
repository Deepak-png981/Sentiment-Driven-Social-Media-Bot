import { Router } from 'express';
import { InstagramController } from '../controllers/InstagramController';
import { LLMSentimentService } from '../services/LLMSentimentService';
import { OpenAIProvider } from '../services/OpenAIProvider';
import { config } from '../config/config';

const router = Router();

const openAIProvider = new OpenAIProvider(config.openaiApiKey);
const sentimentService = new LLMSentimentService(openAIProvider);

const instagramController = new InstagramController(sentimentService);

// Use the same endpoint for GET (verification) and POST (webhook event)
router.route('/webhook')
  .get((req, res) => instagramController.handleWebhook(req, res))
  .post((req, res) => instagramController.handleWebhook(req, res));

export default router;
