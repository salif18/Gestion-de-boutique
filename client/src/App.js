import React from "react";
import {Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import SideBar from "./layouts/SideBar";
import Navbar from "./layouts/Navbar";
import Produits from "./pages/Produits";
import Categories from "./pages/Categories";
import Ventes from "./pages/Ventes";
import Rapports from "./pages/Rapports";
import AddProduits from "./pages/AddProduits";
import Depenseur from "./pages/Depenseur";
import ListeVente from "./pages/ListeVente";
import SingleProduits from "./pages/SingleProduits";
import BestVente from "./pages/BestVente";
import Recus from "./components/Recus";


function App() {
    
  return (
    <>
    <Navbar/>
    <div className="App">
    
     <SideBar />
     
     
      <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/produits" element={<Produits/>}/>
       <Route path="/add-produits" element={<AddProduits/>}/>
       <Route path="/categories" element={<Categories/>}/>
       <Route path="/ventes" element={<Ventes/>} />
       <Route path="/rapports" element={<Rapports/>}/>
       <Route path="/depenser" element={<Depenseur/>} />
       <Route path="/liste-ventes" element={<ListeVente/>} />
       <Route path="/produits/:id" element={<SingleProduits/>} />
       <Route path="/most_sold" element={<BestVente/>} />
       <Route path='/vente-recu' element={<Recus/>} />
      </Routes>
    </div>
    
    </>
  );
}

export default App;
