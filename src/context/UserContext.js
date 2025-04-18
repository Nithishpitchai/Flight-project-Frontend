// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getUser } from '../utils/auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    setUser(getUser()); // re-sync from localStorage on load
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
