import React, { useState } from 'react';
import localhost from 'react-native-localhost';
import axios from 'axios';

export const SetupContext = React.createContext({});

export const SetupProvider = props => {
  const [setupInfo, setSetupInfo] = useState({
    age: null,
    playerImage: null,
    username: null,
  });

  return (
    <SetupContext.Provider
      value={{
        setupInfo,
        setSetupInfo,
      }}>
      {props.children}
    </SetupContext.Provider>
  );
};
