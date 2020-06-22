import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

const { statusBarHeight } = Constants;

export const Wrapper = styled(LinearGradient).attrs({
  colors: ['#F50045', '#F9A826'],
})`
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  height: 30%;
  margin-top: ${statusBarHeight}px;

  align-items: center;
  justify-content: center;
`;

export const Img = styled.Image``;

export const Score = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;

  margin-top: 10px;
`;

export const Pokemon = styled.Image`
  width: 200px;
  height: 200px;

  ${({ showPokemon }) => !showPokemon && { 'tint-color': '#222' }};
`;

export const ButtonOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  width: 85%;
  height: 45px;

  align-items: center;
  justify-content: center;

  background: ${({ success, error }) =>
    success ? 'green' : error ? 'red' : '#ffcb05'};
  border-radius: 15px;
  border: 2px solid;
  border-color: ${({ success, error }) =>
    success || error ? '#fff' : '#2a75bb'};
  margin-bottom: 15px;
`;

export const OptionText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
`;
