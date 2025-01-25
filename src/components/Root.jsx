import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <p>test</p>
      <Outlet />
    </div>
  );
};

export default Root;