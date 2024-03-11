import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Initialize the Apollo Client
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
  cache: new InMemoryCache(),
});

// GraphQL query to fetch token prices
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

// Execute the query
client.query({
  query: GET_TOKEN_PRICES
}).then(result => console.log(result.data));

