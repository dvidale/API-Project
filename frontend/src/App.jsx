import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import LoginFormPage from '../components/LoginFormPage'

function App() {

  return <>
  <BrowserRouter>
  <h1> Hello from App </h1>
  <Routes>
    <Route path='/' element={<h1>Welcome!</h1>}/>
<Route path="/login" element={<LoginFormPage/>}/>


  </Routes>
  
  </BrowserRouter>
 

  </>
}

export default App;
