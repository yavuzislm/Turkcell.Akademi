// src/contexts/ApiContext.jsx

import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/data')
      .then((res) => setApiData(res.data))
      .catch((err) => console.error('API hatası:', err));
  }, []);

  return (
    <ApiContext.Provider value={apiData}>
      {children}
    </ApiContext.Provider>
  );
};
