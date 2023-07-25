import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { useApollo } from "../../lib/apollo";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [loggedIn, setLoggedIn] = useState();
  const [navigationSelected, setNavigationSelected] = useState("");
  //   useEffect(() => {
  //     setLoggedIn(Auth.loggedIn());
  //   }, []);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
