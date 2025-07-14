import React from 'react'
import { getAuthUser } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
  // console.log(authUser.data.user); 

  return { isLoading: authUser.isLoading, authData: authUser.data}
}

export default useAuthUser