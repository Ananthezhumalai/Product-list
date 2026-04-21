require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static files
// const publicPath = path.join(process.cwd(), 'public');
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Swagger
const swaggerDoc = require('./swaggerDoc');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
app.use('/api/products', require('./routes/products'));

// Catch-all
app.use((req, res) => {
  const filePath = path.join(publicPath, 'index.html');

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(200).send('API is running');
    }
  });
});

// Local only
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;