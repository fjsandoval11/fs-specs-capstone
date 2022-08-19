import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './LoginCard.css'
import AnimeCard from '../AnimeCard/AnimeCard'
import SavedList from '../savedList/SavedList'

const LoginCard = ({setUser_id, user_id}) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [useAxios, setUseAxios] = useState(true)

  const [loginStatus, setLoginStatus] = useState(false)
  const[savedList, setSavedList] = useState([])

  const [loggedInUserName, setLoggedInUserName] = useState('')
  
  // const [user_id, setUser_id] = useState('')
 
 const userSet = (response) => {
  // console.log(response)
        setLoginStatus(true)
        setLoggedInUserName(response.data.user.username)
        setUser_id(response.data.user.user_id)
 }

  const login = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:4003/login`, {
      username, 
      password
     },
     {withCredentials: true}
     ).then((response)=> {
      
      if (response.data.loggedIn){
        console.log(response.data)
        userSet(response)
        
      } else {
        setLoginStatus(false)
      }
     })
   
     setUseAxios(false)
     
  }

  // axios.defaults.withCredentials = useAxios

  useEffect(()=>{
    
   
    axios.get(`http://localhost:4003/login`,
    {withCredentials: true}
    )
    .then((response) => {
      
      if(response.data.loggedIn === true){
        userSet(response)
        getAnimeId() 
      }
      
    })
    
  },[loginStatus])

 

  const getAnimeId = () => {
    
    axios.post(`http://localhost:4003/getAnime`,
     {user_id: user_id},
     {withCredentials: true}
     )
    .then((response) => {
    console.log(Array.isArray(response.data))
      console.log(response.data)
      setSavedList(response.data)
      // console.log(savedList)
    })
  }

  return (
    <div>
    <h1> Log in</h1>
    <div className="register_container">
      <form className="register_form">
        <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}/>

        <input type="password" placeholder="password"  onChange={(e)=>{setPassword(e.target.value)}} />

        <br />

        <button type="submit" onClick={login}>Log In</button>
      </form>
    </div>
    <h1>{`welcome ${loggedInUserName}`}</h1>
    
    <div> 


      {savedList.length > 0 && savedList.map((anime, index) => {
        console.log(anime.anime_name)
        return <div key={index} >
        
          {anime.anime_name}
          
        </div>
      })}
      
   
     
    </div>
   
    </div>
  )
}

export default LoginCard