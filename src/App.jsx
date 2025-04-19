import './style/App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CurrentTasksList from './components/CurrentTasksList';
import Navigation from './components/Navigation';


function App() {
  return (
    <div className="App">
      <main className="content">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path='*' element={<CurrentTasksList />}></Route>
            <Route path='/calendar' ></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
