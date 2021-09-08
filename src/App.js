import './App.css';
import Chuck from '../src/chucknorris.jpeg'
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {

  const [state, setState] = useState({
    joke: ''
  })

  useEffect( () => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await axios.get('https://api.chucknorris.io/jokes/random')
    console.log(result.data.value)
    setState({
      ...state,
      joke: result.data.value
    })
    console.log('this is state-->', state)
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
          <input type="text" />
        </div>
      </div> 

      <div>
        <button className="btn btn-warning btn-lg">Generate Joke</button>
      </div>

    </div>

    </div>

    <h2 className="subtitle"> Here is the joke</h2>
    <h4>{state.joke}</h4>
  </div>
  );
}

export default App;
