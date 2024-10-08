import app from './app.js';
import { PORT } from './config.js';
import { connectDB } from './database.js';

await connectDB({ create: false, update: false })
  .then(() => console.log('Database initializate'))
  .catch(e => console.error('An error occurred while initializing the database', e));

app.listen(PORT, () => console.log('Server listen on port', PORT));
