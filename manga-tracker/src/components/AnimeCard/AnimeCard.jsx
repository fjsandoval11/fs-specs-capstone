import React, {useState,useEffect} from 'react'
import './AnimeCard.css'
import axios from 'axios'


const AnimeCard = (props) => {
  
 

  const addToList = (e) => {
    e.preventDefault()
  
    
    axios.post(`http://localhost:4003/addAnime`, {
      user_id: props.user_id ,
      anime_name: props.anime.title
     }).then((response)=> {
      console.log(response)
      
     })
  }

  return (


    <div className='anime-card'>
        <a 
        href={props.anime.url}
         target="_blank"
          rel="noreferrer" >
            <figure>
                <img src={props.anime.images.jpg.image_url}
                alt="Anime Image" />
            </figure>
            <h3>{props.anime.title}</h3>
            <button onClick={addToList}>Add To list</button>
        </a>
   </div>
    
  )
}

export default AnimeCard