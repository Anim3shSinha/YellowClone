import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      max: 280,
    },
    likes: {
      type: Array,
      defaultValue: [],
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    dtype: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", TweetSchema);
