import './App.css';
import Chuck from '../src/chucknorris.jpeg'
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {

  const [state, setState] = useState({
    joke: '',
    searchKeyword: '',
    searchUrl: `https://api.chucknorris.io/jokes/search?query=`
  })

  useEffect( () => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await axios.get('https://api.chucknorris.io/jokes/random')
    setState({
      ...state,
      joke: result.data.value
    })
  }

  const searchJoke = (e) => {
    setState({
      ...state,
      searchKeyword: e.target.value
    })
  }

  const fetchMyJoke = async () => {
    const result = await axios.get(state.searchUrl + state.searchKeyword)
    
    const jokePosition = Math.floor(Math.random()*result.data.result.length)

    setState({
      ...state,
      joke: result.data.result[jokePosition].value
    })
  }

  return (
  <div className="container">
    <div className="row">
      <div className="col-6">
        <h1 className="title">Chuck Norris API</h1>
        <img src={Chuck} alt="Chuck Norris" />
      </div>

    <div className="col-6 searchJokeCol">
      <div className="card">
        <div className="header">
          <span>Search for a word</span>
        </div>
        <div className="card-body">
          <input type="text" onChange={searchJoke} />
        </div>
      </div> 

      <div>
        <button onClick={fetchMyJoke} className="btn btn-warning btn-lg">Generate Joke</button>
      </div>

    </div>

    </div>

    <h2 className="subtitle">Joke</h2>
    <h4>{state.joke}</h4>
  </div>
  )
}

export default App;
