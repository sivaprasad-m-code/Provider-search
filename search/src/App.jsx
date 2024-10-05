import React from 'react'
import{BrowserRouter,Routes,Route}from"react-router-dom"
import Table from './table'
import Search from './search'


function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<Table/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>

    </div>
    </BrowserRouter>
  )
}

export default App