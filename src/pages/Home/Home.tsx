// import React from 'react'

import GitHubStats from "../../components/GitHubStats"
import About from "../../components/HomeComponents/AboutComponents"
import Experience from "../../components/HomeComponents/Experience"
import Hero from "../../components/HomeComponents/Hero"
import TechStack from "../../components/HomeComponents/TechStack"


const Home = () => {
  return (
    <div className='font-bold'>
      <Hero />
      <About />
      <GitHubStats />
      <TechStack />
      <Experience />
    </div>
  )
}

export default Home