// import React from 'react'
import AboutCTA from "../../components/about/AboutCTA"
import AboutHero from "../../components/about/AboutHero"
import OffTheClock from "../../components/about/OffTheClock"
import Principles from "../../components/about/Principles"
import Story from "../../components/about/Story"



const About = () => {
  return (
    <div className='font-bold'>
      <AboutHero />
      <Story />
      <Principles />
      <OffTheClock />
      <AboutCTA />
    </div>
  )
}

export default About