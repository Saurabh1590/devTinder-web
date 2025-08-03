// src/components/Home.jsx (or any other name)
import React from 'react';
import { useSelector } from 'react-redux';
import Feed from './Feed';
import HomePage from './HomePage';

const Home = () => {
  const user = useSelector((store) => store.user);
  return user ? <Feed /> : <HomePage />;
};

export default Home;