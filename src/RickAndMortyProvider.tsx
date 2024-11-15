import React from 'react';

import { ApolloProvider } from '@apollo/client';
import client from './ApolloCliente';
import { CharactersProvider } from './CharactersProvider';

type Props = {
  children: React .ReactNode;
}

export const RickAndMortyProvider = ({ children } :  Props) => {
  return (
    <ApolloProvider client={client}>
      <CharactersProvider>
        {children}
      </CharactersProvider>
    </ApolloProvider>
  );
};