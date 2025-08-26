"use client";
import { useEffect, useState } from "react";
import fetchRepos from "./fetchGithubData";
import { GitHubRepos } from "@/entities/mediaTypes";

export const useRepos = () => {
  const [repos, setRepos] = useState<GitHubRepos[]>([]);

  useEffect(() => {
    fetchRepos().then((fetchedRepos) => {
      setRepos(fetchedRepos);
    });
  }, []);
  return repos;
};
