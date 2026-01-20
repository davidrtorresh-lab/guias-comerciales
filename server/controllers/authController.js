const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'guias-comerciales-secret-key-2026';

// Base de datos simulada (en producción usarías una BD real)
let users = [];
let pendingUsers = [];

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
    const existingUser = users.find(u => u.correo === correo);
    const existingPending = pendingUsers.find(u => u.correo === correo);
    
    if (existingUser || existingPending) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario pendiente
    const newUser = {
      id: Date.now().toString(),
      nombre,
      canal,
      rol,
      telefono,
      correo,
      password: hashedPassword,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    pendingUsers.push(newUser);

    // Notificar al bot de Telegram (si está configurado)
    try {
      const { notifyNewRegistration } = require('../bot/telegramBot');
      notifyNewRegistration(newUser);
    } catch (error) {
      console.log('Bot de Telegram no disponible');
    }

    res.status(201).json({ 
      message: 'Solicitud de registro enviada. Espera la aprobación del administrador.',
      userId: newUser.id
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
    const user = users.find(u => u.correo === correo);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

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
    const user = users.find(u => u.id === decoded.id);

    if (!user || user.status !== 'active') {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const userData = {
      id: user.id,
      nombre: user.nombre,
      canal: user.canal,
      rol: user.rol,
      telefono: user.telefono,
      correo: user.correo
    };

    res.json({ user: userData });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Obtener usuarios pendientes (para admin)
const getPendingUsers = (req, res) => {
  res.json({ pendingUsers });
};

// Aprobar usuario
const approveUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const userIndex = pendingUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = pendingUsers[userIndex];
    user.status = 'active';
    
    users.push(user);
    pendingUsers.splice(userIndex, 1);

    res.json({ 
      message: 'Usuario aprobado exitosamente',
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo
      }
    });
  } catch (error) {
    console.error('Error aprobando usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Rechazar usuario
const rejectUser = (req, res) => {
  try {
    const { userId } = req.body;

    const userIndex = pendingUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    pendingUsers.splice(userIndex, 1);

    res.json({ message: 'Usuario rechazado' });
  } catch (error) {
    console.error('Error rechazando usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener todos los usuarios activos
const getUsers = (req, res) => {
  const userList = users.map(u => ({
    id: u.id,
    nombre: u.nombre,
    canal: u.canal,
    rol: u.rol,
    telefono: u.telefono,
    correo: u.correo,
    status: u.status
  }));
  
  res.json({ users: userList });
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