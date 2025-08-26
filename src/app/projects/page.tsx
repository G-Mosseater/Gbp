"use client"
import { useRepos } from '@/services/useRepos'
import React from 'react'

const Projects = () => {


   const repos =  useRepos()
   console.log(repos)
  return (
    <>    <div>
      <ul>
        {repos.map((repo) =>
        <li key={repo.id}>
          {repo.name}
        </li> )}
      </ul>
    </div>

    </>
  )
}

export default Projects