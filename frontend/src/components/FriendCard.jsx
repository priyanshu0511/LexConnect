import React from "react";
import { Link } from "react-router";
import { getLanguageFlag } from "../lib/utils/getLanguageFlag";
import { capitalize } from "../lib/utils/capitalize";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <div className="font-semibold truncate">{friend.fullName}</div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {capitalize(friend.nativeLanguage)}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {capitalize(friend.learningLanguage)}
          </span>
        </div>
        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
