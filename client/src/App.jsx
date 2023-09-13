// COMPONENTES
import Landing from './view/Landing/Landing'
import Home from './view/Home/Home'
import Detail from './view/Detail/Detail'
import Form from './view/Form/Form'
import NavBar from './view/NavBar/NavBar'
// LIBRERÍAS
import { Route, Routes, useLocation } from 'react-router-dom'


function App() {

  const {pathname} = useLocation();

  return (
    <>
    {pathname !== "/" && <NavBar />}

    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home />} />
      <Route path='/detail/:idDriver' element={<Detail />} />
      <Route path='/form' element={<Form />} />
    </Routes>
    </>
  )
}

export default App
