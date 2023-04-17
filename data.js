import fetch from 'cross-fetch'
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core/core.cjs"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://flyby-router-demo.herokuapp.com/', fetch })
})

// const client = ...

client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));
