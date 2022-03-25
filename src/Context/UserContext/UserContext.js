import React ,{ createContext, useState } from 'react';
import { UseLocalStorage } from '../../Hooks/UseLocalStorage/UseLocalStorage';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const { GetLocalStorage } = UseLocalStorage();
  const [user, setUser] = useState(GetLocalStorage('userData'));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
