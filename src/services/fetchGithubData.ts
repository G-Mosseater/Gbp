import { Octokit } from "@octokit/core";
import { GitHubRepos } from "@/entities/mediaTypes";
const octokit = new Octokit();

const fetchRepos = async (): Promise<GitHubRepos[]>  => {

  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      username: "G-Mosseater",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const repos:GitHubRepos[] = response.data  as GitHubRepos[]
    return repos
  } 
  catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
};
fetchRepos();


export default fetchRepos