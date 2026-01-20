const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'guias-comerciales-secret-key-2026';

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Middleware para verificar acceso por canal
const checkAccess = (allowedCanales) => {
  return (req, res, next) => {
    const userCanal = req.user.canal;
    const userRol = req.user.rol;

    // Desarrolladores y TRADE&TRAINING tienen acceso total
    if (userRol === 'Desarrollador' || userCanal === 'TRADE&TRAINING') {
      return next();
    }

    // Verificar si el canal está permitido
    if (allowedCanales.includes(userCanal)) {
      return next();
    }

    return res.status(403).json({ error: 'No tienes acceso a esta sección' });
  };
};

module.exports = {
  authenticateToken,
  checkAccess
};