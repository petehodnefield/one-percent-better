import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { useState, useEffect, createContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { useApollo } from "../../lib/apollo";
import Auth from "../utils/Auth";

export const LoginContext = createContext();

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [loggedIn, setLoggedIn] = useState();
  useEffect(() => {
    setLoggedIn(Auth.loggedIn());
  }, []);
  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </LoginContext.Provider>
  );
}
