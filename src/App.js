import React from 'react'
import Login from './login'
import Signup from './Signup'

import "./App.css"
import Header from "./components/common/header/Header"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Footer from "./components/common/footer/Footer"
import Home from "./components/home/Home"


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/courses' element={<CourseHome/>} />
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          {/* <Route exact path='/team' element={Team} />
          <Route exact path='/pricing' element={Pricing} />
          <Route exact path='/journal' element={Blog} />
          <Route exact path='/contact' element={Contact} /> */}
        </Routes>
        <Footer />
      </Router>
     
    </>
  )
}

export default App