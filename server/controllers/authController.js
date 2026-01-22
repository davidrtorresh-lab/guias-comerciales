const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'guias-comerciales-secret-key-2026';

// Función para generar token JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      nombre: user.nombre, 
      canal: user.canal, 
      rol: user.rol,
      correo: user.correo 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Registrar usuario (pendiente de aprobación)
const register = async (req, res) => {
  try {
    const { nombre, canal, rol, telefono, correo, password } = req.body;

    // Validar campos
    if (!nombre || !canal || !rol || !telefono || !correo || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el correo ya existe
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE correo = $1',
      [correo]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario pendiente
    const userId = Date.now().toString();
    await pool.query(
      'INSERT INTO users (id, nombre, canal, rol, telefono, correo, password, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [userId, nombre, canal, rol, telefono, correo, hashedPassword, 'pending']
    );

    // Notificar al bot de Telegram (si está configurado)
    try {
      const { notifyNewRegistration } = require('../bot/telegramBot');
      notifyNewRegistration({ id: userId, nombre, correo, telefono, canal, rol, createdAt: new Date().toISOString() });
    } catch (error) {
      console.log('Bot de Telegram no disponible');
    }

    res.status(201).json({ 
      message: 'Solicitud de registro enviada. Espera la aprobación del administrador.',
      userId
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Validar campos
    if (!correo || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    // Buscar usuario
    const result = await pool.query(
      'SELECT * FROM users WHERE correo = $1',
      [correo]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];

    // Verificar si está activo
    if (user.status !== 'active') {
      return res.status(403).json({ error: 'Tu cuenta está pendiente de aprobación' });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token
    const token = generateToken(user);

    // Datos del usuario (sin contraseña)
    const userData = {
      id: user.id,
      nombre: user.nombre,
      canal: user.canal,
      rol: user.rol,
      telefono: user.telefono,
      correo: user.correo
    };

    res.json({ 
      message: 'Login exitoso',
      token,
      user: userData
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Verificar token
const verifyToken = (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    pool.query(
      'SELECT * FROM users WHERE id = $1 AND status = $2',
      [decoded.id, 'active']
    ).then(result => {
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      const user = result.rows[0];
      const userData = {
        id: user.id,
        nombre: user.nombre,
        canal: user.canal,
        rol: user.rol,
        telefono: user.telefono,
        correo: user.correo
      };

      res.json({ user: userData });
    }).catch(err => {
      console.error('Error verificando token:', err);
      res.status(401).json({ error: 'Token inválido' });
    });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Obtener usuarios pendientes (para admin)
const getPendingUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, canal, rol, telefono, correo, created_at FROM users WHERE status = $1 ORDER BY created_at DESC',
      ['pending']
    );

    const pendingUsers = result.rows.map(user => ({
      id: user.id,
      nombre: user.nombre,
      canal: user.canal,
      rol: user.rol,
      telefono: user.telefono,
      correo: user.correo,
      createdAt: user.created_at
    }));

    res.json({ pendingUsers });
  } catch (error) {
    console.error('Error obteniendo pendientes:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Aprobar usuario
const approveUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await pool.query(
      'UPDATE users SET status = $1 WHERE id = $2 RETURNING id, nombre, correo',
      ['active', userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ 
      message: 'Usuario aprobado exitosamente',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Error aprobando usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Rechazar usuario
const rejectUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 AND status = $2 RETURNING id',
      [userId, 'pending']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario rechazado' });
  } catch (error) {
    console.error('Error rechazando usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener todos los usuarios activos
const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, canal, rol, telefono, correo, status FROM users WHERE status = $1 ORDER BY nombre',
      ['active']
    );

    const users = result.rows.map(user => ({
      id: user.id,
      nombre: user.nombre,
      canal: user.canal,
      rol: user.rol,
      telefono: user.telefono,
      correo: user.correo,
      status: user.status
    }));

    res.json({ users });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
  getPendingUsers,
  approveUser,
  rejectUser,
  getUsers
};
