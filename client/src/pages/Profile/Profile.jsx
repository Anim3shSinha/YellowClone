import React, { useState, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";

import { following } from "../../redux/userSlice";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userFollowing, setUserFollowing] = useState(0);
  const [userFollowers, setUserFollowers] = useState(0);
  const [userName, setUserName] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(
          `http://localhost:5000/api/tweets/user/all/${id}`
        );
        const userProfile = await axios.get(
          `http://localhost:5000/api/users/find/${id}`
        );

        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
        console.log(userProfile.data);
        setUserName(userProfile.data.username);
        setUserFollowing(userProfile.data.following.length);
        setUserFollowers(userProfile.data.followers.length);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);

  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      try {
        const follow = await axios.put(
          `http://localhost:5000/api/users/follow/${id}`,
          {
            id: currentUser._id,
          },
          {
            headers,
            withCredentials: true, // Include cookies with the request
          }
        );
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    } else {
      try {
        const unfollow = await axios.put(
          `http://localhost:5000/api/users/unfollow/${id}`,
          {
            id: currentUser._id,
          },
          {
            headers,
            withCredentials: true, // Include cookies with the request
          }
        );

        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  function getFirstCharacterUpperCase(inputString) {
    if (typeof inputString === "string" && inputString.length > 0) {
      return inputString.charAt(0).toUpperCase();
    } else {
      return "";
    }
  }
  const styles = {
    info: {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    },
    label: {
      fontWeight: "bold",
    },
    value: {
      backgroundColor: "#f0f0f0", // Adjust background color as needed
      padding: "5px",
      borderRadius: "3px",
      width: "100%",
      display: "block",
      marginTop: "10px",
    },
  };
  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-4"
        style={{
          display: "flex",
          flexDirection: "row",
          // border: "2px solid black",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div
          className="px-6"
          style={{
            boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
            flex: " 0 0 25%",
            position: "fixed",
            top: "130px",
            left: "0",
            width: "25%",
            height: "90vh",
          }}
        >
          <LeftSidebar />
        </div>

        <div
          className="col-span-2 border-x-2 border-t-slate-800 px-6"
          style={{
            boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
            flex: " 0 0 50%",
            // border: "2px solid black",
          }}
        >
          {open === true ? (
            <>
              <div className="btn">
                <button
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  &#8592; Back
                </button>

                <hr />
                <hr />
                <br />
              </div>
              <div style={styles.info}>
                <div>
                  <span style={styles.label}>UserName</span>
                  <span style={styles.value}>{userProfile.username}</span>
                </div>
                <div>
                  <span style={styles.label}>Email</span>
                  <span style={styles.value}>{userProfile.email}</span>
                </div>
                <div>
                  <span style={styles.label}>Followers</span>
                  <span style={styles.value}>
                    {userProfile.followers.length}
                  </span>
                </div>
                <div>
                  <span style={styles.label}>Following</span>
                  <span style={styles.value}>
                    {userProfile.following.length}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="flex justify-between items-center"
                style={{
                  // boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
                  flex: " 0 0 50%",
                  // border: "2px solid black",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  <span
                    style={{
                      backgroundColor: "rgb(219 234 254)",
                      padding: "10px",
                      fontWeight: "bolder",
                      height: "50px",
                      width: "50px",
                      borderRadius: "30%",
                      marginRight: "10px",
                      // fontSize: "20px",
                    }}
                  >
                    {userName !== null
                      ? getFirstCharacterUpperCase(userName)
                      : " "}
                  </span>
                  {userName !== null ? userName : " "}
                </span>
                {currentUser._id === id ? (
                  <button
                    className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                    onClick={() => setOpen(true)}
                  >
                    View Profile
                  </button>
                ) : currentUser.following.includes(id) ? (
                  <button
                    className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                    onClick={handleFollow}
                  >
                    Following
                  </button>
                ) : (
                  <button
                    className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                    onClick={handleFollow}
                  >
                    Follow
                  </button>
                )}
              </div>

              <div className="mt-6">
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      fontWeight: "bold",
                    }}
                  >
                    <div>Followers {userFollowers}</div>
                    <div>Following {userFollowing}</div>
                  </div>
                </div>

                <br />
                <h1
                  style={{
                    fontWeight: "bold",
                    borderTop: "2px solid grey",
                    textAlign: "center",
                  }}
                >
                  <br />
                  Tweets
                </h1>
                <br />
                {userTweets !== null
                  ? userTweets.map((tweet) => {
                      return (
                        <div className="p-2" key={tweet._id}>
                          <Tweet tweet={tweet} setData={setUserTweets} />
                        </div>
                      );
                    })
                  : "No tweets to show"}
              </div>
            </>
          )}
        </div>

        <div
          className="px-6"
          style={{
            boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
            flex: " 0 0 25%",
            position: "fixed",
            top: "130px",
            right: "0",
            width: "25%",
            height: "90vh",
          }}
        >
          <RightSidebar />
        </div>
      </div>
      {/* {open && <EditProfile setOpen={setOpen} />} */}
    </>
  );
};

export default Profile;
