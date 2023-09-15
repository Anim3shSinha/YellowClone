import axios from "axios";
import React, { useState, useEffect } from "react";
import formatDistance from "date-fns/formatDistance";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ListIcon from "@mui/icons-material/List";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CancelIcon from "@mui/icons-material/Cancel";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { CONST } from "../../constant";

const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState(tweet.description);
  const [tweetImg1, setTweetImg1] = useState(null);
  const [userData, setUserData] = useState();
  const [tick1, setTick1] = useState(false);
  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [imgurl, setImgUrl] = useState(null);

  useEffect(() => {
    if (tweet.image) {
      if (tweet.image.data) {
        const blob = new Blob([Int8Array.from(tweet.image.data.data)], {
          type: tweet.image.contentType,
        });
        const url = window.URL.createObjectURL(blob);
        setImgUrl(url);
        if (imgurl) {
          console.log(tweet.description, tweet.image.contentType);
          console.log(tweet.description, imgurl);
        }
      }
    }
  }, []);

  const headers = {
    "Content-Type": "application/json",
  };

  const handleFileChange1 = async (e) => {
    const selectedFile = e.target.files[0];
    // console.log("asdf111");
    if (selectedFile) {
      // console.log(selectedFile);
      setTweetImg1(selectedFile);
      setTick1(selectedFile.name);
    }
  };

  const toggleOptionsMenu = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const updateTweetAndRefresh = async (tweetId, editedDescription) => {
    try {
      const formData1 = new FormData();
      formData1.append("userId", currentUser._id);
      formData1.append("description", editedDescription);
      formData1.append("imageData", tweetImg1);
      formData1.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await axios.put(
        // `http://localhost:5000/api/tweets/update/${tweetId}`,
        `${CONST.server}/api/tweets/update/${tweetId}`,
        formData1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        window.location.reload(false);
      } else {
        console.error("Failed to update tweet");
      }
    } catch (error) {
      console.error("Error updating tweet:", error);
    }
  };

  const handleFormSubmit = (tweetId, editedDescription) => {
    updateTweetAndRefresh(tweetId, editedDescription);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(
          // `http://localhost:5000/api/users/find/${tweet.userId}`
          `${CONST.server}/api/users/find/${tweet.userId}`
        );

        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const like = await axios.put(
        // `http://localhost:5000/api/tweets/${tweet._id}/like`,
        `${CONST.server}/api/tweets/${tweet._id}/like`,
        {
          id: currentUser._id,
        }
      );

      if (like) {
        console.log("tweet liked");
      }

      if (location.includes("profile")) {
        const newData = await axios.get(
          // `http://localhost:5000/api/tweets/user/all/${id}`
          `${CONST.server}/api/tweets/user/all/${id}`
        );
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(
          // `http://localhost:5000/api/tweets/explore`
          `${CONST.server}/api/tweets/explore`
        );
        setData(newData.data);
      } else {
        const newData = await axios.get(
          // `http://localhost:5000/api/tweets/timeline/${currentUser._id}`
          `${CONST.server}/api/tweets/timeline/${currentUser._id}`
        );
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteTweet = async (tweetId, userId) => {
    try {
      const response = await axios.delete(
        // `http://localhost:5000/api/tweets/delete/${tweetId}`,
        `${CONST.server}/api/tweets/delete/${tweetId}`,
        {
          data: { id: userId },
        },
        {
          headers,
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Tweet deleted successfully");
        window.location.reload(false);
      } else {
        console.error("Failed to delete tweet");
      }
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };

  return (
    <div
      style={{
        // backgroundColor: "#e9eaf2",
        padding: "2px",
        borderRadius: "10px",
      }}
    >
      {userData && (
        <>
          <div className="flex space-x-2" style={{ position: "relative" }}>
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>

            <span className="font-normal">@{userData.username}</span>
            <p> - {dateStr}</p>
            {isOptionsMenuOpen && (
              <div
                className="ml-auto"
                style={{
                  position: "absolute",
                  right: "0",
                  display: "flex",
                  justifyContent: "space-between",
                  // border: "2px solid black",
                  width: "20%",
                }}
              >
                {currentUser._id === tweet.userId && (
                  <>
                    <EditIcon
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={openModal}
                    />
                    {isModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="modal-container bg-white p-6 mx-auto rounded-lg shadow-lg w-96">
                          <h2 className="text-xl font-semibold mb-4">
                            Edit Tweet
                          </h2>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleFormSubmit(tweet._id, editedDescription);
                            }}
                          >
                            <textarea
                              className="w-full p-3 border rounded"
                              rows="6"
                              value={editedDescription}
                              onChange={handleDescriptionChange}
                            ></textarea>

                            <label className="custom-file-input">
                              <label
                                for="files1"
                                style={{ cursor: "pointer" }}
                                // onChange={handleFileChange}
                              >
                                <AddPhotoAlternateIcon fontSize="large" />
                                {tick1 || ""}
                              </label>
                              <input
                                onChange={handleFileChange1}
                                id="files1"
                                style={{
                                  visibility: "hidden",
                                  cursor: "pointer",
                                }}
                                type="file"
                              ></input>
                            </label>

                            <div className="mt-4 flex justify-end">
                              <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              >
                                Update Tweet
                              </button>
                              <button
                                className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                onClick={closeModal}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {currentUser._id === tweet.userId && (
                  <DeleteOutlineIcon
                    fontSize="small"
                    onClick={() => {
                      deleteTweet(tweet._id, currentUser._id);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                )}
                {currentUser._id === tweet.userId && (
                  <button
                    onClick={toggleOptionsMenu}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CancelIcon fontSize="small" />
                  </button>
                )}
              </div>
            )}

            {!isOptionsMenuOpen && currentUser._id === tweet.userId && (
              <div
                className="ml-auto"
                style={{
                  position: "absolute",
                  right: "0",
                  display: "flex",
                  justifyContent: "center",
                  width: "20%",
                  fontWeight: "bold",
                }}
                onClick={toggleOptionsMenu}
              >
                <ListIcon />
              </div>
            )}
          </div>

          <hr />
          <hr />
          <hr />
          {tweet.description && (
            <p
              style={{
                marginBottom: "2px",
                backgroundColor: "rgb(241 245 249)",
                borderRadius: "5px",
                minHeight: "50px",
              }}
            >
              {tweet.description}
            </p>
          )}
          {tweet.dtype !== "1" && tweet.image && (
            <img
              src={imgurl}
              alt=""
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}

          {tweet.dtype === "1" && tweet.image && <div>vid url {imgurl}</div>}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <button onClick={handleLike}>
              {tweet.likes.includes(currentUser._id) ? (
                <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
              )}
              {tweet.likes.length}
            </button>
            <button>
              <ChatBubbleOutlineIcon />
            </button>
          </div>
          <hr />
          <hr />
        </>
      )}
    </div>
  );
};

export default Tweet;
