import React, { Component } from 'react'
import logo from './images/logoRussia2018.jpg'
import './App.css'
import { MundialRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './context/Context'

class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
            <MundialRoutes />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
