require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config/database');


const authRoutes = require('./routes/authRoutes');
const { initBot } = require('./bot/telegramBot');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializar conexión a PostgreSQL
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL:', err);
  }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Servir archivos estáticos del build de React
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route: devolver index.html para todas las rutas (React Router)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // Inicializar bot de Telegram (solo si está configurado)
  if (process.env.TELEGRAM_BOT_TOKEN) {
    initBot();
  } else {
    console.log('ℹ️  Bot de Telegram no configurado (opcional)');
  }
});
