import { useContext } from 'react';
import { CharactersContext } from './CharactersProvider';


export const useRickAndMortyContext = () => {
  const context = useContext(CharactersContext);
  if (!context) {
    throw new Error('useRickAndMortyContext must be used within a CharactersProvider');
  }
  return context;
};
