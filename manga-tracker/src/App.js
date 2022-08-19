import React, { useState, useEffect } from "react";
import { RegisterCard } from "./components/RegisterCard/RegisterCard";
import LoginCard, { test } from "./components/LogInCard/LoginCard";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";

import axios from "axios";
import { Routes, Route } from "react-router-dom";

function App() {
 
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState("");
  const [user_id, setUser_id] = useState('')


 

  const handleSearch = (e) => {
    e.preventDefault();
    getAnime(search);
    setSearch("");
  };

  const getAnime = () => {
    axios
      .get(
        `https://api.jikan.moe/v4/anime?q=${search}&sfw&limit=10`
      )
      .then((res) => {
        console.log(res)
        setAnimeList(res.data.data);
       
      });
  };

 
  return (
    <div>
      <Header />

      

      <RegisterCard />

      <LoginCard 
      
      setUser_id={setUser_id}
      user_id={user_id}
      />

<SearchBar
        handleSearch={handleSearch}
        search={search}
        animeList={animeList}
        setSearch={setSearch}
        user_id={user_id}
      />
    </div>
  );
}

export default App;
