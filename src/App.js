import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/Main"
import { ProductPage } from "./pages/ProductPage";
import { CategoryPage } from "./pages/CategoryPage"
import { LoginPage } from "./pages/EnterPage";
import { GoodsPage } from "./pages/GoodsPage";
import { RegPage } from "./pages/RegistrationPage";


function App() {

  return (
    <div className="App" style={{position:"relative", minWidth: "1000px",maxWidth: "1400px", padding:"0 15px", background:'#D1D0E5'}}>
      <Routes>
        
       
        <Route path="/" element={<MainPage />} />
        <Route path="/:type" element={<CategoryPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Reg" element={<RegPage />} />
        <Route path="/Goods" element={<GoodsPage />} />

        <Route path="/:type/:id" element={<ProductPage />} />
        {/* <Route path="/" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
