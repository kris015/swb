import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost/scandiweb-store/backend/index.php', // Update with your backend URL
  cache: new InMemoryCache()
});

export default client;