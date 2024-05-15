// useUser.ts

import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import { UserProfileType } from "@/assets/types";

export function useGetUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfileType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const user = await UserService.getUserProfile();
      if (!user) {
        setError(true);
      }
      setUserProfile([]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return { user: userProfile, error, loading };
}

export function useGetPostsIds() {
  const [ids, setIds] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPostsIdsByUserId = async () => {
    setLoading(true);
    try {
      const user = await UserService.getUserProfile();
      if (!user) {
        setError(true);
      }
      setIds([]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsIdsByUserId();
  }, []);

  return { ids, error, loading };
}
