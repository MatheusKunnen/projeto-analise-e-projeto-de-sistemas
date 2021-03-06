import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Project from '../pages/Project';

const AllRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<SignUp/>} path="/cadastro" />
      <Route element={<Home/>} path="/" />
      <Route element={<Project/>} path="/projeto/:id" />
    </Routes>
  </BrowserRouter>
);

export default AllRoutes;
