import OpenAI from 'openai';

// You should set your OpenAI API key in your environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // Optionally, set baseURL or other config here
});

export default openai;
