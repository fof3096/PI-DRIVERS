import './App.css'
import Landing from './view/Landing/Landing'
import Home from './view/Home/Home'
import Detail from './view/Detail/Detail'
import Form from './view/Form/Form'
import { Route, Routes } from 'react-router-dom'



function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/form' element={<Form />} />
    </Routes>
    </>
  )
}

export default App
