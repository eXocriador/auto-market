import Chat from '../models/Chat.js'; 

export const sendMessage = async (req, res) => {
  try {
    const { postId, sellerId, buyerId, text } = req.body;

    let chat = await Chat.findOne({ postId, sellerId, buyerId });

    if (!chat) {
      chat = new Chat({ postId, sellerId, buyerId, messages: [] });
    }

    chat.messages.push({
      text,
      senderId: buyerId, // або sellerId — залежить, хто пише
      createdAt: new Date(),
    });

    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Помилка надсилання повідомлення' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { postId, buyerId } = req.query;

    const chat = await Chat.findOne({ postId, buyerId });

    if (!chat) {
      return res.status(200).json([]); // ще немає повідомлень
    }

    res.status(200).json(chat.messages);
  } catch (error) {
    res.status(500).json({ message: 'Помилка отримання повідомлень' });
  }
};

