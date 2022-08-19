import React from 'react'
import './SearchBar.css'
import AnimeCard from '../AnimeCard/AnimeCard'


const SearchBar = (props) => {
    
  return (
    <div className="main-head">
        <form className='search-box'
        onSubmit={props.handleSearch}>
            <input type="search" placeholder='search for an anime'
            required
            value={props.search}
            onChange={e => props.setSearch(e.target.value)}/>
        </form>
      <div className="anime-list">{props.animeList.map(anime => (
         <AnimeCard 
         anime={anime}
         key={anime.mal_id} 
         user_id={props.user_id}
         />

      ))}
      </div>
    </div>
  )
}

export default SearchBar