require('dotenv').config();
const { app } = require('./app');

if (!process.env.JWT_SECRET) {
  // eslint-disable-next-line no-console
  console.error(
    'JWT_SECRET is required. Set it in your environment or .env file.'
  );
  process.exit(1);
}

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
