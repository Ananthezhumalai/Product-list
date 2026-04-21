require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const swaggerDoc = require('./swaggerDoc');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
app.use('/api/products', require('./routes/products'));

// Catch-all route to serve the frontend (since it's a minimal single-page app or static pages)
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
  });
}

// Export for Vercel serverless
module.exports = app;
