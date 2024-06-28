import React, { createContext, useState, useEffect } from 'react';

// Creamos el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setLoggedInUser(user);
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
      {console.log(loggedInUser)}
    </AuthContext.Provider>
  );
};