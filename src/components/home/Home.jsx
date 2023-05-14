import React from "react"
import AboutCard from "../about/AboutCard"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import OnlineCourses from "../allcourses/OnlineCourses";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
      {/*<HAbout />*/}
      <OnlineCourses />
      {/* <Testimonal /> */}
      {/* <Hblog /> */}
      {/* <Hprice /> */}
    </>
  )
}

export default Home
