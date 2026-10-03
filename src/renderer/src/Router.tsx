import { Route } from 'react-router-dom'

import { Router } from '../../lib/electron-router-dom'
import Home from './pages/home'
import Create from './pages/create'
import Detail from './pages/detail'
import About from './pages/about' 
import Layout from './components/layout'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/customer/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
        </Route>
      }
    />
  )
}
