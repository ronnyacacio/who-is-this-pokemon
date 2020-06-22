import React, { useState, useEffect } from 'react';
import { shuffle } from 'lodash';

import title from '../../images/title.png';
import logo from '../../images/pokemon-logo.png';
import pokeapi from '../../services/pokeapi';

import {
  Wrapper,
  Header,
  Img,
  Score,
  Pokemon,
  ButtonOption,
  OptionText,
} from './styles';

export default function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [pokeIds, setPokeIds] = useState([]);
  const [choosenPokemons, setChoosenPokemons] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);

  async function loadPokemon() {
    const randomPokeNumber = Math.round(Math.random() * (151 - 1) + 1);
    const response = await pokeapi.get(`/${randomPokeNumber}`);

    setPokemon(response.data);
    setChoosenPokemons((prevState) => [...prevState, response.data]);
    setPokeIds((prevState) => [...prevState, randomPokeNumber]);
  }

  async function loadChoosenPokemons() {
    let i = 0;
    while (i < 3) {
      const randomPokeNumber = Math.round(Math.random() * (151 - 1) + 1);
      const pokeExists = pokeIds.includes(randomPokeNumber);
      if (!pokeExists) {
        setPokeIds((prevState) => [...prevState, randomPokeNumber]);
        const response = await pokeapi.get(`/${randomPokeNumber}`);
        setChoosenPokemons((prevState) => [...prevState, response.data]);
        i++;
      }
    }
    setChoosenPokemons((prevState) => shuffle(prevState));
  }

  function start() {
    setAnswer(false);
    setSelected(0);
    setLoading(true);
    setChoosenPokemons([]);
    loadPokemon();
    loadChoosenPokemons();
    setLoading(false);
  }

  useEffect(() => {
    start();
  }, []);

  function handleSelect(id) {
    setAnswer(true);
    setSelected(id);
    if (id === pokemon.id) {
      setScore((prevState) => prevState + 10);
    } else {
      setScore(0);
    }
    setTimeout(() => start(), 2500);
  }

  return (
    <Wrapper>
      <Header>
        <Img source={title} resizeMode="contain" />
        <Img source={logo} resizeMode="contain" />

        <Score>Pontos: {score}</Score>
      </Header>

      {!loading && pokemon && choosenPokemons && (
        <>
          <Pokemon
            showPokemon={!!answer}
            source={{ uri: pokemon.sprites.front_default }}
          />
          {choosenPokemons.map(({ id, name }) => (
            <ButtonOption
              key={id}
              onPress={!!answer ? () => {} : () => handleSelect(id)}
              success={!!answer && id === pokemon.id}
              error={!!answer && id === selected}
            >
              <OptionText>{name}</OptionText>
            </ButtonOption>
          ))}
        </>
      )}
    </Wrapper>
  );
}
