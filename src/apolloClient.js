import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://36c3-62-4-44-148.ngrok-free.app/scandiweb-store/backend/', // Update with your backend URL
  cache: new InMemoryCache()
});

export default client;