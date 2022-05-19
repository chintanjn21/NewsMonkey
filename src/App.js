import "./App.css";
import News from "./components/News";
import React, { useState } from 'react'
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default function App() {
  const[progress, setProgress] = useState(0);
  return (
    <div>
      <Router>
        <LoadingBar height={3} color='brown' progress={progress}/>
        <NavBar/>
        <Routes>
          <Route exact path="/" element ={<News setProgress={setProgress} key='Home' title='Home' country='in' category='general'/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress} key='Business' title='Business' country='in' category='business'/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key='Entertainment' title='Entertainment' country='in' category='entertainment'/>}/>
          {/* <Route exact path="/environment" element={<News setProgress={setProgress} key='Environment' title='Environment' country='in' category='environment'/>}/> */}
          <Route exact path="/general" element={<News setProgress={setProgress} key='General' title='General' country='in' category='general'/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} key='Health' title='Health' country='in' category='health'/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} key='Science' title='Science' country='in' category='science'/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} key='Sports' title='Sports' country='in' category='sports'/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} key='Technology' title='Technology' country='in' category='technology'/>}/>
        </Routes>
      </Router>
    </div>
  )
}

//