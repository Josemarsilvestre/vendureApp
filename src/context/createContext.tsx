// createContext.tsx
import React, { useReducer, ReactNode } from "react";

interface ContextValue<State, Action> {
  state: State;
  dispatch: React.Dispatch<Action>;
}

interface CreateContextProps<State, Action> {
  reducer: React.Reducer<State, Action>;
  actions: { [key: string]: (...args: any[]) => Action };
  initialState: State;
}

export default function createContext<State, Action>(
  { reducer, actions, initialState }: CreateContextProps<State, Action>
) {
  const Context = React.createContext<ContextValue<State, Action>>({
    state: initialState,
    dispatch: () => {}
  });

  const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions: { [key: string]: (...args: any[]) => void } = {};
    for (const key in actions) {
      boundActions[key] = (...args: any[]) => dispatch(actions[key](...args));
    }

    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  };
  
  return { Context, Provider };
};
