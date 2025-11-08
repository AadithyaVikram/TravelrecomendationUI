// src/App.tsx


import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar'; // Or './components/Navbar' if using Navbar
import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar data-testid="navbar"/>
      <AppRoutes />
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
