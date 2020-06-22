import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Audio } from 'expo-av';

import Home from './screens/Home';

export default function App() {
  const [active, setActive] = useState(false);

  const soundObject = new Audio.Sound();

  async function playSong() {
    await soundObject.loadAsync(require('../music/pokesong.mp3'));
    await soundObject.playAsync();
    await soundObject.setIsLoopingAsync(true);
  }

  useEffect(() => {
    if (!active) playSong();
    setActive(true);
  }, []);

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <Home />
    </>
  );
}
