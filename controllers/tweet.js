import Tweet from "../models/Tweet.js";
import { handleError } from "../error.js";
import User from "../models/User.js";

export const createTweet = async (req, res, next) => {
  console.log("asdf");
  const newTweet = new Tweet({
    userId: req.body.userId,
    description: req.body.description || null,
    image: {
      data: req.file ? req.file.buffer || null : null,
      contentType: req.file ? req.file.mimeType || null : null,
    },
    dtype: req.body.dtype || "0",
  });
  // console.log(newTweet);
  try {
    const savedTweet = await newTweet.save();
    res.status(200).json(savedTweet);
  } catch (err) {
    handleError(500, err);
  }
};

export const updatedTweet = async (req, res, next) => {
  const tweetId = req.params.id;
  // console.log(req.body);
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    // console.log(req.body.description);
    const mergedTweetData = {
      userId: req.body.userId || tweet.userId,
      description: req.body.description || tweet.description,
      image: {
        data: (req.file ? req.file.buffer || null : null) || tweet.image.data,
        contentType:
          (req.file ? req.file.mimeType || null : null) ||
          tweet.image.contentType,
      },
    };
    // console.log(mergedTweetData.description);
    tweet.set(mergedTweetData);
    const updatedTweet = await tweet.save();
    res.status(200).json(updatedTweet);
  } catch (err) {
    handleError(500, err, res);
  }
};

export const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.body.id) {
      await tweet.deleteOne();
      res.status(200).json("tweet has been deleted");
    } else {
      handleError(500, err);
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const likeOrDislike = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("tweet has been liked");
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("tweet has been disliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const getAllTweets = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followersTweets = await Promise.all(
      currentUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );
    res.status(200).json(userTweets.concat(...followersTweets));
  } catch (err) {
    handleError(500, err);
  }
};

export const getUserTweets = async (req, res, next) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createAt: -1,
    });

    res.status(200).json(userTweets);
  } catch (err) {
    handleError(500, err);
  }
};

export const getExploreTweets = async (req, res, next) => {
  try {
    const getExploreTweets = await Tweet.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });

    res.status(200).json(getExploreTweets);
  } catch (err) {
    handleError(500, err);
  }
};
