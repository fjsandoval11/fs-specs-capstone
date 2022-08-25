import React from 'react'
import './SavedList.css'

const SavedList = (props) => {
  return (
    
        <div className='savedCard'>
        <a 
        href={props.anime_link}
         target="_blank"
          rel="noreferrer" >
            <figure>
                <img src={props.anime_img}
                alt="Anime Image" />
            </figure>
            <h3>{props.anime}</h3>
            {/* <button onClick={addToList}>Add To list</button> */}
        </a>
   </div>

   
  )
}

export default SavedList