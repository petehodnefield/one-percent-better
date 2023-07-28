// Date formats
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const month = monthNames[new Date().getMonth()];
const day = new Date().getDate();
const year = new Date().getFullYear();
export const todaysDate = `${month} ${day}, ${year}`;
