import './App.css'

import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from './context/Context'
import logo from './images/logoRussia.png'
import { MundialRoutes } from './routes'

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
