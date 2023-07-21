const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    tags: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true,
          },
          comment: {
            type: String,
          },
        },
      ],
      default: [],
    },
    reports: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true,
          },
          reportReason: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
