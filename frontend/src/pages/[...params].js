import React, { useEffect, useState, useContext } from "react";
import { SINGLE_AREA } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_IMPROVEMENT } from "../utils/mutations";
import { initializeApollo } from "../../lib/apollo";
import HomeContent from "../components/Home/HomeContent";
import { todaysDate } from "../utils/date";
import ParamsHomeContent from "../components/Home/ParamsHomeContent";
import Banner from "../components/Banner/Banner";
import Auth from "../utils/Auth";
import { LoginContext } from "./_app";
import { logout } from "../utils/logout";
import Loading from "../components/Loading/Loading";
const AreaDetails = ({ queryID }) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [noImprovements, setNoImprovements] = useState(false);
  const areaID = queryID.params[0];

  return (
    <div className="home">
      <Banner />
      <ParamsHomeContent noImprovements={noImprovements} areaID={areaID} />
      {loggedIn ? (
        <button
          onClick={logout}
          className="btn btn--lg logout rounded btn--dark"
        >
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default AreaDetails;

export const getServerSideProps = async ({ query }) => {
  const queryID = query;
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SINGLE_AREA,
    variables: { areaId: queryID.params[0] },
  });

  return {
    props: { initializeApolloState: apolloClient.cache.extract(), queryID },
  };
};
