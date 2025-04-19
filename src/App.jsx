import './style/App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CurrentTasksList from './components/CurrentTasksList';
import Navigation from './components/Navigation';
import AllTasks from './components/AllTasks';


function App() {
  return (
    <div className="App">
      <main className="content">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path='*' element={<CurrentTasksList />}></Route>
            <Route path='/calendar' element={<AllTasks/>}></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
