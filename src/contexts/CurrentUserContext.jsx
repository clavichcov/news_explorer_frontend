import React from "react";

const CurrentUserContext = React.createContext();

export default CurrentUserContext;

/*import { createContext, useState } from 'react';

export const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: function() {} 
});

export const CurrentUserProvider = function({ children }) { 
  const [currentUser, setCurrentUser] = useState(null);
  
  return (
    CurrentUserContext.Provider({ 
      value: { currentUser, setCurrentUser },
      children: children
    })
  );
};*/