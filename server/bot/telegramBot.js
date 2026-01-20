const TelegramBot = require('node-telegram-bot-api');
const authController = require('../controllers/authController');

let bot;
let adminId;

const initBot = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  adminId = process.env.TELEGRAM_ADMIN_ID;

  if (!token) {
    console.log('⚠️  TELEGRAM_BOT_TOKEN no configurado. Bot deshabilitado.');
    return;
  }

  bot = new TelegramBot(token, { polling: true });

  console.log('🤖 Bot de Telegram iniciado - Módulo Guías Comerciales');

  // COMANDOS CON PREFIJO /guias_ para evitar conflictos

  // Comando /guias_help
  bot.onText(/\/guias_help/, (msg) => {
    const chatId = msg.chat.id;
    
    if (chatId.toString() !== adminId) {
      bot.sendMessage(chatId, '❌ No tienes permisos para usar los comandos de Guías Comerciales.');
      return;
    }

    const helpMessage = `
📚 *Guías Comerciales - Comandos*

*Gestión de Usuarios:*
/guias_pending - Ver solicitudes pendientes
/guias_users - Lista de usuarios activos
/guias_approve [ID] - Aprobar usuario
/guias_reject [ID] - Rechazar usuario
/guias_stats - Estadísticas del sistema

*Ejemplo de uso:*
\`/guias_approve 1737381234567\`
    `;
    bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
  });

  // Comando /guias_pending - Ver usuarios pendientes
  bot.onText(/\/guias_pending/, async (msg) => {
    const chatId = msg.chat.id;

    if (chatId.toString() !== adminId) {
      bot.sendMessage(chatId, '❌ No tienes permisos para ejecutar este comando.');
      return;
    }

    try {
      const pendingUsers = await getPendingUsersFromController();

      if (pendingUsers.length === 0) {
        bot.sendMessage(chatId, '✅ No hay usuarios pendientes de aprobación.');
        return;
      }

      let message = '*📋 Usuarios Pendientes - Guías Comerciales:*\n\n';
      
      pendingUsers.forEach((user, index) => {
        message += `━━━━━━━━━━━━━━━━━━━\n`;
        message += `*${index + 1}. ${user.nombre}*\n\n`;
        message += `📧 *Email:* ${user.correo}\n`;
        message += `📱 *Tel:* ${user.telefono}\n`;
        message += `🏢 *Canal:* ${user.canal}\n`;
        message += `👤 *Rol:* ${user.rol}\n`;
        message += `📅 *Fecha:* ${new Date(user.createdAt).toLocaleDateString('es-CO')}\n\n`;
        message += `🆔 ID: \`${user.id}\`\n\n`;
        message += `✅ /guias_approve_${user.id}\n`;
        message += `❌ /guias_reject_${user.id}\n`;
      });

      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error obteniendo pendientes:', error);
      bot.sendMessage(chatId, '❌ Error al obtener usuarios pendientes.');
    }
  });

  // Comando /guias_users - Ver usuarios activos
  bot.onText(/\/guias_users/, async (msg) => {
    const chatId = msg.chat.id;

    if (chatId.toString() !== adminId) {
      bot.sendMessage(chatId, '❌ No tienes permisos para ejecutar este comando.');
      return;
    }

    try {
      const users = await getUsersFromController();

      if (users.length === 0) {
        bot.sendMessage(chatId, '📭 No hay usuarios activos aún.');
        return;
      }

      // Agrupar por canal
      const usersByCanal = users.reduce((acc, user) => {
        if (!acc[user.canal]) acc[user.canal] = [];
        acc[user.canal].push(user);
        return acc;
      }, {});

      let message = `*👥 Usuarios Activos (${users.length}):*\n\n`;
      
      Object.keys(usersByCanal).forEach(canal => {
        message += `*🏢 ${canal}* (${usersByCanal[canal].length})\n`;
        usersByCanal[canal].forEach((user, index) => {
          message += `  ${index + 1}. ${user.nombre} - ${user.rol}\n`;
          message += `     📧 ${user.correo}\n`;
        });
        message += '\n';
      });

      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      bot.sendMessage(chatId, '❌ Error al obtener usuarios.');
    }
  });

  // Comando /guias_stats - Estadísticas
  bot.onText(/\/guias_stats/, async (msg) => {
    const chatId = msg.chat.id;

    if (chatId.toString() !== adminId) {
      bot.sendMessage(chatId, '❌ No tienes permisos para ejecutar este comando.');
      return;
    }

    try {
      const users = await getUsersFromController();
      const pending = await getPendingUsersFromController();

      const statsByCanal = users.reduce((acc, user) => {
        if (!acc[user.canal]) acc[user.canal] = 0;
        acc[user.canal]++;
        return acc;
      }, {});

      const statsByRol = users.reduce((acc, user) => {
        if (!acc[user.rol]) acc[user.rol] = 0;
        acc[user.rol]++;
        return acc;
      }, {});

      let message = `📊 *Estadísticas - Guías Comerciales*\n\n`;
      message += `👥 *Usuarios Activos:* ${users.length}\n`;
      message += `⏳ *Pendientes:* ${pending.length}\n\n`;
      
      message += `*Por Canal:*\n`;
      Object.keys(statsByCanal).forEach(canal => {
        message += `  • ${canal}: ${statsByCanal[canal]}\n`;
      });

      message += `\n*Por Rol:*\n`;
      Object.keys(statsByRol).forEach(rol => {
        message += `  • ${rol}: ${statsByRol[rol]}\n`;
      });

      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      bot.sendMessage(chatId, '❌ Error al obtener estadísticas.');
    }
  });

  // Aprobar usuario - /guias_approve_[ID]
  bot.onText(/\/guias_approve_(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1];

    if (chatId.toString() !== adminId) {
      bot.sendMessage(chatId, '❌ No tienes permisos para ejecutar este comando.');
      return;
    }

    try {
      const result = await approveUserFromController(userId);
      
      if (result.success) {
        const approveMessage = `
✅ *Usuario Aprobado*

*Nombre:* ${result.user.nombre}
*Email:* ${result.user.correo}

El usuario ya puede acceder a la plataforma.
        `;
        bot.sendMessage(chatId, approveMessage, { parse_mode: 'Markdown' });
      } else {
        bot.sendMessage(chatId, `❌ ${result.error}`);
      }
    } catch (error) {
      console.error('Error aprobando usuario:', error);
      bot.sendMessage(chatId, '❌ Error al aprobar usuario.');
    }
  });

  // Rechazar usuario - /guias_reject_[ID]
  bot.onText(/\/guias_reject_(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1];

    if (chatId.toString() !== adminId) {
      bot.sendMessage(chatId, '❌ No tienes permisos para ejecutar este comando.');
      return;
    }

    try {
      const result = await rejectUserFromController(userId);
      
      if (result.success) {
        bot.sendMessage(chatId, '✅ Usuario rechazado y eliminado de la lista.');
      } else {
        bot.sendMessage(chatId, `❌ ${result.error}`);
      }
    } catch (error) {
      console.error('Error rechazando usuario:', error);
      bot.sendMessage(chatId, '❌ Error al rechazar usuario.');
    }
  });
};

// Funciones auxiliares
const getPendingUsersFromController = () => {
  return new Promise((resolve) => {
    const mockReq = {};
    const mockRes = {
      json: (data) => resolve(data.pendingUsers || [])
    };
    authController.getPendingUsers(mockReq, mockRes);
  });
};

const getUsersFromController = () => {
  return new Promise((resolve) => {
    const mockReq = {};
    const mockRes = {
      json: (data) => resolve(data.users || [])
    };
    authController.getUsers(mockReq, mockRes);
  });
};

const approveUserFromController = (userId) => {
  return new Promise((resolve) => {
    const mockReq = { body: { userId } };
    const mockRes = {
      json: (data) => resolve({ success: true, user: data.user }),
      status: (code) => ({
        json: (data) => resolve({ success: false, error: data.error })
      })
    };
    authController.approveUser(mockReq, mockRes);
  });
};

const rejectUserFromController = (userId) => {
  return new Promise((resolve) => {
    const mockReq = { body: { userId } };
    const mockRes = {
      json: () => resolve({ success: true }),
      status: (code) => ({
        json: (data) => resolve({ success: false, error: data.error })
      })
    };
    authController.rejectUser(mockReq, mockRes);
  });
};

// Enviar notificación al admin cuando hay nuevo registro
const notifyNewRegistration = (user) => {
  if (!bot || !adminId) return;

  const message = `
🔔 *Nueva Solicitud - Guías Comerciales*

*Nombre:* ${user.nombre}
*Email:* ${user.correo}
*Teléfono:* ${user.telefono}
*Canal:* ${user.canal}
*Rol:* ${user.rol}

Para gestionar:
/guias_pending
  `;

  bot.sendMessage(adminId, message, { parse_mode: 'Markdown' });
};

module.exports = {
  initBot,
  notifyNewRegistration
};
