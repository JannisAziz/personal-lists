import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import ShoppingListPage from "./pages/ShoppingListPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="shoppingListPage" element={<ShoppingListPage />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;