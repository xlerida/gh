import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = Number.parseInt(process.env.PORT || 8080);

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Simulated in-memory store
let emailMap = {};

// -----------------------------------------------------------------------------
// API Handlers
// -----------------------------------------------------------------------------
app.post('/api/send-email', (req, res) => {
  const email = req.body.email;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Simple cooldown logic (30 seconds)
  const now = Date.now();
  const lastSent = emailMap[email]?.sentAt || 0;
  if (now - lastSent < 30 * 1000) {
    return res.status(429).json({ error: 'Please wait 30 seconds before resending.' });
  }

  // Generate a 6-digit code & cleanup after 5 min
  const code = Math.floor(Math.random() * 1e6).toString().padStart(6, '0');
  emailMap[email] = { code, sentAt: now };
  setTimeout(() => {
    delete emailMap[email];
  }, 5 * 60 * 1000);

  console.log(`Code for ${email}: ${code}`);
  return res.status(200).json({ message: 'Email sent successfully!' });
});

app.post('/api/validate-email', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required.' });
  }

  const isValid = emailMap[email]?.code === code;
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid email or code.' });
  }

  delete emailMap[email];
  return res.status(200).json({ user_id: Math.ceil(1e5 + Math.random() * 1e8) });
});

app.get('/api/products', (req, res) => {
  console.log('Sending product details');
  res.status(200).json({
    monthly: {
      price: "9.99",
      currency: "USD",
      trial_days: 3,
    },
    year: {
      price: "87.99",
      currency: "USD",
      trial_days: 7,
    },
  });
});

app.post('/api/start-trial', (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  console.log(`User with ID ${user_id} started a trial.`);
  return res.status(200).json({ message: 'Trial started successfully!' });
});

// -----------------------------------------------------------------------------
// Start Server with HTTP
// -----------------------------------------------------------------------------
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('Exposed REST APIs:');
  console.log('- POST /api/send-email');
  console.log('- POST /api/validate-email');
  console.log('- GET /api/products');
  console.log('- POST /api/start-trial');
});
