import { useDispatch, useSelector } from 'react-redux'
import { Button, Box, Grid, Typography } from '@mui/material'

import { decrement, increment } from './features/counterSlice'
import { RootState } from './store'
import './App.css'
import Companies from './components/Companies'
import SingleCompany from './components/SingleCompany'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home  from './pages/Home'
import Error from './pages/Error'


function App() {
  //const count = useSelector((state: RootState) => state.counter.value)
  //const dispatch = useDispatch()

  return (
    <div className="App">
      {/* <h1>Vite + React + Toolkit + MUI</h1>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <Button variant="contained" onClick={() => dispatch(increment())}>
              Increment
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Typography>{count}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Button variant="contained" onClick={() => dispatch(decrement())}>
              Decrement
            </Button>
          </Grid>
        </Grid>
      </Box> */}
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/companies" element={<Companies/>}></Route>
        <Route path="/companies/:id" element={<SingleCompany/>}></Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App