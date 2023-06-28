const User = require("./models/User.js");
const seedDB = async () => {
  await User.deleteMany();

  const createUser = await User.create({
    name: "Peter",
    improvements: [
      {
        date: "June 26, 2023",
        skillPercentage: 1,
        description: "Today, I learned about interfaces in TypeScript.",
      },
      {
        date: "June 27, 2023",
        skillPercentage: 1.01,
        description: "Today, I designed NeuroHabit.",
      },
      {
        date: "June 28, 2023",
        skillPercentage: 1.0201,
        description: "Today, learned about server-side React components.",
      },
      {
        date: "June 29, 2023",
        skillPercentage: 1.0303,
        description: "Today, I learned about client-side React components.",
      },
      {
        date: "June 30, 2023",
        skillPercentage: 1.040603,
        description: "Today, I built the frontend for NeuroHabit.",
      },
    ],
  });

  console.log(`🌱 db seeded!`);
};

module.exports = seedDB;
