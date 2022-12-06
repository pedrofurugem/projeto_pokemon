import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeList } from './homeList'
import { PokemonDetails } from './pokemonDetails'

const AppRoutes = () => {
    return(
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomeList />} />
            <Route exact path="/PokemonDetails/:name" element={<PokemonDetails />}/>
          </Routes>
        </BrowserRouter>
    )

}

export default AppRoutes 