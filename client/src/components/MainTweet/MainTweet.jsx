import React, { useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import axios from "axios";
import { CONST } from "../../constant";

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const [tweetImg, setTweetImg] = useState(null);
  const [tweetVid, setTweetVid] = useState(null);
  const [tick, setTick] = useState("");
  const [tick2, setTick2] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setTweetImg(selectedFile);
      setTick(selectedFile.name);
    }
  };
  const clearImage = async () => {
    setTweetImg("");
    setTick("");
  };
  const clearVideo = async () => {
    setTweetVid("");
    setTick2("");
  };
  const handleFileVidChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setTweetVid(selectedFile);
      setTick2(selectedFile.name);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("asdf");

    try {
      const formData = new FormData();
      formData.append("userId", currentUser._id);
      if (tweetText) {
        formData.append("description", tweetText);
      }

      if (tweetImg) {
        formData.append("dtype", "0");
        formData.append("imageData", tweetImg);
      } else if (tweetVid) {
        formData.append("dtype", "1");
        formData.append("imageData", tweetVid);
      }

      const submitTweet = await axios.post(
        // "http://localhost:5000/api/tweets",
        `${CONST.server}/api/tweets`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (submitTweet) {
        console.log("Tweet Created");
      }
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6" onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening..."
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-evenly",
            // flexDirection: "column",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <div
            style={{
              // border: "2px solid black",
              width: "60%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!tick2 && (
              <div>
                <label className="custom-file-input">
                  <label
                    for="files"
                    class="btn"
                    style={{
                      // border: "2px solid black",
                      cursor: "pointer",
                      width: "20%",
                    }}
                  >
                    <AddPhotoAlternateIcon fontSize="large" />
                    {tick || ""}{" "}
                    {tick && (
                      <div style={{ cursor: "pointer" }} onClick={clearImage}>
                        <ClearIcon />
                      </div>
                    )}
                  </label>
                  <input
                    id="files"
                    style={{ visibility: "hidden" }}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  ></input>
                </label>
              </div>
            )}
            {!tick && (
              <div>
                <label className="custom-file-input">
                  <label for="files2" class="btn" style={{ cursor: "pointer" }}>
                    <VideoCameraBackIcon fontSize="large" />
                    {tick2 || ""}
                    {tick2 && (
                      <div style={{ cursor: "pointer" }} onClick={clearVideo}>
                        <ClearIcon />
                      </div>
                    )}
                  </label>
                  <input
                    id="files2"
                    style={{ visibility: "hidden" }}
                    type="file"
                    accept="video/*"
                    onChange={handleFileVidChange}
                  ></input>
                </label>
              </div>
            )}
          </div>
          <button
            type="submit"
            style={{
              // border: "2px solid black",
              height: "50px",
              // padding: "10px",
              width: "80px",
              borderRadius: "20px",
            }}
            className="bg-blue-500 text-white py-2 px-4 ml-auto"
          >
            Post
          </button>
        </div>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;
