import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";
import { CONST } from "../../constant";

const TimelineTweet = () => {
  const [timeLine, setTimeLine] = useState(null);
  // const randomizedArray = [...timeLine].sort(() => Math.random() - 0.5);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineTweets = await axios.get(
          // `http://localhost:5000/api/tweets/timeline/${currentUser._id}`
          `${CONST.server}/api/tweets/timeline/${currentUser._id}`
        );

        setTimeLine(timelineTweets.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser._id]);

  // console.log("Timeline", timeLine);
  return (
    <div className="mt-6">
      {timeLine !== null
        ? timeLine.map((tweet) => {
            return (
              <div key={tweet._id} className="p-2">
                {/* {tweet.userId === currentUser._id && "asdf"} */}
                <Tweet tweet={tweet} setData={setTimeLine} />
              </div>
            );
          })
        : "Loading tweets"}
    </div>
  );
};

export default TimelineTweet;
