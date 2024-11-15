import { ApolloError, gql, useQuery } from '@apollo/client';
import React, { createContext, useState, useCallback } from 'react';

type Props = {
  children: React.ReactNode,
  currentPage?: number
}

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

type Response = {
  loading: boolean,
  error: ApolloError | undefined,
  data: object,
  page: number,
  loadMore: () => void
};


export const CharactersContext = createContext<Response>({
  loading: true,
  error: undefined,
  data: {},
  page: 0,
  loadMore: () => void 0,
});


export const CharactersProvider = ({ children, currentPage = 1 }: Props) => {
  const [page, setPage] = useState(currentPage);
  const { loading, error, data, fetchMore} = useQuery(GET_CHARACTERS, {
    variables: { page },
  });
  
  const loadMore = useCallback(() => {
    if (data?.characters.info.next) {
      setPage(data.characters.info.next);
      fetchMore({
        variables: { page: data.characters.info.next },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            characters: {
              ...fetchMoreResult.characters,
              results: [
                ...prevResult.characters.results,
                ...fetchMoreResult.characters.results,
              ],
            },
          };
        },
      });
    }
  }, [data, fetchMore]);

  return (
    <CharactersContext.Provider value={{ loading, error, data, page, loadMore }}>
      {children}
    </CharactersContext.Provider>
  );
};
