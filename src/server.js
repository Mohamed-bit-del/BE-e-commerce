const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const app = require('./app');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
