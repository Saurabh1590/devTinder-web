import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { GitPullRequest, GitMerge, XCircle, CheckCircle2, Clock, Terminal } from "lucide-react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error("something went wrong: ", err);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(requestId));
    } catch (err) {
      console.error("something went wrong: ", err);
    }
  };

  useEffect(() => {
    if (!requests) {
      fetchRequests();
    }
  }, [requests, dispatch]);

  // --- LOADING STATE ---
  if (!requests) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center font-mono text-[#8b949e]">
        <div className="flex items-center gap-3 animate-pulse">
             <Terminal size={20} />
             <span>git fetch origin requests...</span>
        </div>
      </div>
    );
  }

  // --- EMPTY STATE ---
  if (requests.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center font-mono text-[#c9d1d9] p-4">
        <div className="text-center max-w-md">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#161b22] border border-[#30363d] mb-6">
              <CheckCircle2 size={32} className="text-[#238636]" />
           </div>
           <h1 className="text-2xl font-bold mb-2">All caught up!</h1>
           <p className="text-[#8b949e] mb-6">
             No open pull requests. Your repository is up to date.
           </p>
           <div className="bg-[#161b22] border border-[#30363d] p-3 text-xs rounded-sm inline-block">
              <span className="text-[#ff7b72]">0</span> open <span className="text-[#8b949e]">/</span> <span className="text-[#238636]">0</span> closed
           </div>
        </div>
      </div>
    );
  }

  // --- MAIN LIST ---
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 font-mono min-h-screen text-[#c9d1d9]">
      
      {/* Header */}
      <div className="bg-[#161b22] border border-[#30363d] border-b-0 rounded-t-sm p-4 flex items-center justify-between">
         <div className="flex items-center gap-2 text-sm font-bold">
            <GitPullRequest className="text-[#238636]" size={18} />
            <span>{requests.length} Open</span>
         </div>
         <div className="text-xs text-[#8b949e] flex items-center gap-1">
             <Clock size={12} />
             <span>Sort: Newest</span>
         </div>
      </div>

      {/* List Container */}
      <div className="border border-[#30363d] rounded-b-sm bg-[#0d1117] divide-y divide-[#30363d]">
        
        {requests.map((request) => {
          const { _id, firstName, lastName, gender, age, about, photoUrl } =
            request?.fromUserId || {};

          if (!_id) return null;

          return (
            <div
              key={request._id}
              className="p-4 hover:bg-[#161b22] transition-colors group flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              {/* Icon Status (Desktop) */}
              <div className="hidden sm:block pt-1">
                 <GitPullRequest className="text-[#238636]" size={18} />
              </div>

              {/* Avatar */}
              <div className="flex-shrink-0">
                 <img
                  src={photoUrl}
                  alt={firstName}
                  className="w-12 h-12 rounded-sm border border-[#30363d] object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0">
                 <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="font-bold text-[#c9d1d9] text-base hover:text-[#58a6ff] cursor-pointer truncate">
                        {firstName} {lastName}
                    </h2>
                    <span className="text-[#8b949e] text-xs">wants to merge into main</span>
                    
                    {age && (
                        <span className="bg-[#161b22] border border-[#30363d] px-1.5 py-0.5 text-[10px] text-[#79c0ff] rounded-full">
                            v{age}.0
                        </span>
                    )}
                 </div>
                 
                 <p className="text-sm text-[#8b949e] line-clamp-1 font-sans">
                    {about || "No description provided."}
                 </p>
                 
                 <div className="text-xs text-[#8b949e] mt-1">
                    #{request._id.slice(-6)} opened by {firstName.toLowerCase()}
                 </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                 <button
                    onClick={() => reviewRequest("rejected", request._id)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#161b22] border border-[#30363d] text-[#ff7b72] hover:bg-[#da3633]/10 hover:border-[#ff7b72] text-xs font-bold transition-all rounded-sm"
                    title="Close Request"
                 >
                    <XCircle size={14} />
                    <span className="sm:hidden">Close</span>
                 </button>

                 <button
                    onClick={() => reviewRequest("accepted", request._id)}
                    className="flex-[2] sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 bg-[#238636] text-white border border-[#2ea043] hover:bg-[#2ea043] text-xs font-bold transition-all rounded-sm shadow-sm"
                    title="Merge Request"
                 >
                    <GitMerge size={14} />
                    <span>Merge</span>
                 </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer / Pagination hint */}
      <div className="text-center mt-6 text-xs text-[#8b949e]">
        <p>ProTip: Add a clear commit message when merging requests.</p>
      </div>
      
    </div>
  );
};

export default Requests;