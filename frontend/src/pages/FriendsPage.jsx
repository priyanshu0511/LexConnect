import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserFriends } from "../lib/api";
import { LuMapPin, LuUser } from "react-icons/lu";

const FriendsPage = () => {
  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Your Friends
        </div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {friends.length > 0 && (
              <section className="space-y-4">
                <div className="space-y-3">
                  {friends.map((friend) => (
                    <div
                      key={friend._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <div className="avatar w-10 h-10 xs:w-16 xs:h-16 rounded-full bg-base-300">
                              <img
                                src={friend.profilePic}
                                alt={friend.fullName}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg xs:text-2xl mb-1 xs:mb-4">
                                {friend.fullName}
                              </h3>
                              <div className="flex flex-wrap gap-0.5 xs:gap-1.5 mt-1">
                                <span className="badge badge-secondary badge-sm">
                                  Native: {friend.nativeLanguage}
                                </span>
                                <span className="badge badge-outline badge-sm">
                                  Learning: {friend.learningLanguage}
                                </span>
                              </div>
                              <div className="mt-1 xs:mt-3">
                                <span className="text-xs xs:text-base">{friend.bio}</span>
                              </div>
                              <div className="flex mt-1 xs:mt-3 items-center gap-1 xs:gap-2">
                                <LuMapPin className="size-3 xs:size-4"/>
                                <span className="text-xs xs:text-base">{friend.location}</span>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
