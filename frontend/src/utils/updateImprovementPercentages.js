import { useMutation } from "@apollo/client";
import { DELETE_IMPROVEMENT, UPDATE_IMPROVEMENT } from "../utils/mutations";
const [deleteImprovement, { loading, data, error }] =
  useMutation(DELETE_IMPROVEMENT);

const [
  updateImprovementMutation,
  { loading: updateLoading, data: updateData, error: updateError },
] = useMutation(UPDATE_IMPROVEMENT);
export async function removeImprovement(improvement) {
  try {
    // Remove the selected improvement
    const removeImprovement = await deleteImprovement({
      variables: {
        deleteImprovementId: improvement,
      },
    });
    // console.log(removeImprovement);
    const getRemainingImprovements =
      await removeImprovement.data.deleteImprovement.map((data, index, arr) => {
        updateEveryImprovement(data, index);
      });
  } catch (e) {
    console.log(e);
  }
}

export async function updateEveryImprovement(data, index) {
  if (index === 0) {
    const updateImprovement = await updateImprovementMutation({
      variables: {
        updateImprovementId: data._id,
        skillPercentage: 1,
      },
    });
  } else {
    const skillPercentageMultiple = 1 * 1.01 ** index;
    const updateImprovements = await updateImprovementMutation({
      variables: {
        updateImprovementId: data._id,
        skillPercentage: skillPercentageMultiple,
      },
    });
  }
}
