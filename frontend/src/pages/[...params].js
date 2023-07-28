import React, { useEffect, useState } from "react";
import { SINGLE_AREA } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo";
import HomeContent from "../components/Home/HomeContent";
import { todaysDate } from "../utils/date";
import ParamsHomeContent from "../components/Home/ParamsHomeContent";
import Banner from "../components/Banner/Banner";

const AreaDetails = ({ queryID }) => {
  const [newImprovement, setNewImprovement] = useState({});
  const [noImprovements, setNoImprovements] = useState(false);
  const areaID = queryID.params[0];

  // useEffect(() => {
  //   if (
  //     meData === undefined ||
  //     meData.area === null ||
  //     meData.area.improvements === null ||
  //     meData.area.improvements === undefined
  //   ) {
  //     return;
  //   }
  //   // This is the code that runs if the user has only 1 area
  //   else if (meData.area.area.length === 1) {
  //     setSelectedArea(meData.me.areas[0].area);

  //     setUserId(meData.me._id);
  //     setNewImprovement({
  //       ...newImprovement,
  //       skillPercentage: 1,
  //       date: todaysDate,
  //     });
  //   } else {
  //     // Destructure to set the area name
  //     const areaName = meData.area.area;
  //     setSelectedArea(areaName);
  //     // Destructure data into area specific improvements
  //     const areaImprovements = meData.area.improvements;
  //     if (areaImprovements.length === 0) {
  //       console.log("This has no improvements");
  //       setNewImprovement({
  //         ...newImprovement,
  //         skillPercentage: 1,
  //         date: todaysDate,
  //       });
  //     } else {
  //       const allImprovements = areaImprovements.map((data, index, arr) => {
  //         if (arr.length - 1 === index) {
  //           if (data.date === todaysDate) {
  //             // setCompletedImprovement(true);
  //           }
  //           const newSkillPercentage = data.skillPercentage * 1.01;
  //           setNewImprovement({
  //             ...newImprovement,
  //             skillPercentage: newSkillPercentage,
  //             date: todaysDate,
  //           });
  //         }

  //         setAllImprovements((oldImprovements) => [
  //           ...oldImprovements,
  //           {
  //             date: data.date,
  //             improvement: data.skillPercentage,
  //           },
  //         ]);
  //       });
  //     }
  //   }
  //   console.log("newImprovement", newImprovement);
  // }, [meData]);

  // Handler that adds a new improvement
  async function addNewImprovement() {
    // Set today as completed (so you can't add more than one point)
    setCompletedImprovement(true);
    try {
      await addImprovement({
        variables: {
          date: todaysDate,
          skillPercentage: newImprovement.skillPercentage,
          description: newImprovement.description,
          areaId: areaId,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Function that runs when 'Add Improvement' button is clicked
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNewImprovement();
    window.location.reload();
  };

  return (
    <div className="home">
      <Banner />
      <ParamsHomeContent
        noImprovements={noImprovements}
        handleFormSubmit={handleFormSubmit}
        areaID={areaID}
        newImprovement={newImprovement}
        setNewImprovement={setNewImprovement}
      />
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
