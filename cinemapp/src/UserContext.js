// UserContext.js

import { createContext, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContext;
