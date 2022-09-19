import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Body from '../Components/Body/Body'
import axios from 'axios'




const Home = () => {
  const fetchFF = async () => {
    const { data } = await axios.get("/users");
    console.log(data);
  };

  useEffect(() => {
    fetchFF();
  }, []);



  return (
    <div>
        <Navbar/>
        <Body/>
    </div>
  )
}

export default Home