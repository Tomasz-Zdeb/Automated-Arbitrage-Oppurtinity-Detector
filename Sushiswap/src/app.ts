import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
  cache: new InMemoryCache(),
});

const GET_TOKEN_PRICES = gql`
  {
    pairs {
      token0 {
        symbol
        name
      }
      token1 {
        symbol
        name
      }
      token0Price
      token1Price
    }
  }
`;

client.query({
  query: GET_TOKEN_PRICES
}).then(result => console.log(result.data));

// https://docs.sushi.com/docs/Developers/Subgraphs/Overview