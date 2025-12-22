import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    link: new HttpLink({
        //@ts-expect-error should work, but doesn't
        uri: import.meta.env.VITE_SERVER_URL,
    }),
    cache: new InMemoryCache(),
})