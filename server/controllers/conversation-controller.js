import Conversation from "../models/Conversation.js";

// todo after authorization convert body.userid to req.userId

export const createNewConversation = async (req, res) => {
  // check if conversation already exists
  const existingConversation = await Conversation.findOne({
    members: { $all: [req.userId, req.body.receiverId] },
  });

  if (existingConversation) {
    return res.status(400).json({ message: "Conversation already exists" });
  }

  // To create a new conversation
  const newConversation = new Conversation({
    members: [req.userId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// todo after authorization convert params to req.userId
export const getUserConversation = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.userId] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTwoUserConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    if (conversation) {
      res.status(200).json(conversation);
    } else {
      const newConversation = new Conversation({
        members: [req.params.firstUserId, req.params.secondUserId],
      });

      try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
