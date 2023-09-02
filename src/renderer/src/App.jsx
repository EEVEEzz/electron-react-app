import { HashRouter  as Router, Route, Routes, Link } from 'react-router-dom'
import icons from './assets/icons.svg'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
