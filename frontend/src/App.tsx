import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import ShoppingListPage from "./pages/ShoppingListPage";
import TodoListPage from "./pages/TodoListPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/shoppingListPage" element={<ShoppingListPage />}/>
          <Route path="/todoListPage" element={<TodoListPage />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;