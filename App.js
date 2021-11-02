import React from 'react';
import {AuthProvider} from './src/AuthStuff/AuthProvider';
import {Main} from './src/Main';

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

export default App;
