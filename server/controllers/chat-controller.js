import Chat from "../models/Chat.js";

export const createMessage = async (req, res) => {
  const newMessage = new Chat(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessages = async (req, res) => {
  try {
    const allMessages = await Chat.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(allMessages);
  } catch (err) {
    res.status(500).json(err);
  }
};
