import React from 'react';
import { StatusBar } from 'react-native';

import Home from './screens/Home';
// import Player from './components/Player';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />

      <Home />
    </>
  );
}
