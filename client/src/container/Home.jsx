import React from 'react';
import { useRouteError } from 'react-router-dom';
const Home = () => {
  const error = useRouteError();
  console.log(error);
  return <div>Home</div>;
};

export default Home;
