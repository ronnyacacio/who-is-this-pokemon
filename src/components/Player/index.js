import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Player } from '@react-native-community/audio-toolkit';

import { Container, SoundIcon } from './styles';

const player = new Player(
  'https://vgmdownloads.com/soundtracks/pokemon-gameboy-sound-collection/vvdpydwp/101-opening.mp3'
);

player.looping = true;
player.play();

export default function CustomPlayer() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    player.playPause();
  }, [active]);

  return (
    <Container>
      <TouchableOpacity onPress={() => setActive(!active)}>
        <SoundIcon active={active} />
      </TouchableOpacity>
    </Container>
  );
}
