import React, { useReducer } from "react";

export default (reducer, actions, initialValue) => {
  const Context = React.createContext(initialValue);

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(
      reducer,
      initialValue
    );

    const customFunctions = {}
    
    Object.keys(actions).forEach(
      (key) =>
        (customFunctions[key] = actions[key](dispatch))
    );

    return (
      <Context.Provider value={{ state, ...customFunctions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};