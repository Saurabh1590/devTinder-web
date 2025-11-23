// src/components/Feed.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";
import { Terminal, CheckCircle2 } from "lucide-react";

const Feed = () => {
  const feed = useSelector((store) => store?.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log("error: " + err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Loading State (Skeleton could go here, but simple text for now)
  if (!feed) return (
    <div className="flex justify-center items-center h-[60vh] text-[#8b949e] font-mono animate-pulse">
       <Terminal className="mr-2" /> Loading resources...
    </div>
  );

  // Empty State - "System Idle"
  if (feed.length <= 0)
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] font-mono text-[#c9d1d9]">
        <div className="bg-[#161b22] border border-[#30363d] p-8 rounded-sm text-center max-w-md shadow-xl">
           <div className="flex justify-center mb-4">
              <CheckCircle2 size={48} className="text-[#238636]" />
           </div>
           <h1 className="text-xl font-bold mb-2">All files reviewed</h1>
           <p className="text-[#8b949e] mb-6">
             There are no new potential matches in your queue. 
             Check back later for new commits.
           </p>
           <div className="bg-[#0d1117] p-3 text-xs border border-[#30363d] text-left">
              <span className="text-[#ff7b72]">$</span> git status<br/>
              <span className="text-[#8b949e]">On branch main</span><br/>
              <span className="text-[#238636]">nothing to commit, working tree clean</span>
           </div>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center my-10 px-4">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
