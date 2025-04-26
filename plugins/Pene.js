// plugins/pene.js 
// Créditos a Neykoor
import { areJidsSameUser } from '@whiskeysockets/baileys';

const handler = async (m, { conn, args, command, mentionedJid }) => {
  // Mensajes para cuando mencionan a alguien
  const mentionMessages = [
    (user) => `¿Acaso @${user} quiere *pene*? 😏`,
    (user) => `Parece que @${user} anda buscando algo... ¿será *pene*? 🍌`,
    (user) => `@${user} ¿te hace falta un poco de *pene* en tu vida?`,
    (user) => `¡Alerta! @${user} está solicitando *pene* urgente 🚨`,
    (user) => `@${user} recibirá su dosis de *pene* en 3... 2... 1... 💦`
  ];
  
  // Mensajes para cuando no mencionan a nadie
  const soloMessages = [
    `¿Quién anda buscando *pene* por aquí? 😏`,
    `Alguien quiere *pene* pero no se atreve a decirlo... 🍆`,
    `¡Pene para todos! 🎉`,
    `¿Será que el grupo quiere *pene*? 🤔`,
    `*Pene* delivery, ¿quién lo pidió? 🚗💨`
  ];

  try {
    if (mentionedJid && mentionedJid.length > 0) {
      // Si mencionaron a alguien
      const target = mentionedJid[0];
      const user = target.replace(/@s\.whatsapp\.net/g, '').split('@')[0];
      const randomMsgFn = mentionMessages[Math.floor(Math.random() * mentionMessages.length)];
      const messageText = randomMsgFn(user);
      
      await conn.sendMessage(m.chat, {
        text: messageText,
        mentions: [target]
      }, { quoted: m });
    } else {
      // Si no mencionaron a nadie
      const randomMsg = soloMessages[Math.floor(Math.random() * soloMessages.length)];
      await conn.sendMessage(m.chat, { 
        text: randomMsg 
      }, { quoted: m });
    }
  } catch (error) {
    console.error('Error en el comando pene:', error);
    await conn.sendMessage(m.chat, { 
      text: 'Ocurrió un error al procesar tu solicitud de *pene* 😅' 
    }, { quoted: m });
  }
};

handler.command = handler.help = ['pene'];
handler.tags = ['fun'];
handler.group = true;

export default handler;
