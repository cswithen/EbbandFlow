import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";

export const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    flag: false,
    randomData: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { data: randomData } = await axios.get("");
        setState({ ...state, randomData });
      } catch (error) {
        console.error(error);
        setState({ ...state, error: error });
      }
    };

    if (isMounted) fetchData();

    return () => {
      isMounted = false;
    };
  }, [state.flag]);

  const triggerNewCall = () => {
    setState({...state, flag: !state.flag})
  }

  const providerValue = {
    state,
    setState,
    triggerNewCall,
  };

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};

export default ContextProvider;
