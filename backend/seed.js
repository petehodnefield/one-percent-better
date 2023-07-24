import Improvement from "./models/Improvement.js";
import User from "./models/User.js";
export default async function seedDB() {
  await User.deleteMany();
  await Improvement.deleteMany();

  const createUser = await User.create({
    username: "Peter",
    password: "password",
  });

  const improvements = await Improvement.create(
    {
      date: "June 23, 2023",
      skillPercentage: 1,
      description: "Today, I learned about interfaces in TypeScript.",
    },
    {
      date: "June 24, 2023",
      skillPercentage: 1.01,
      description: "Today, I designed NeuroHabit.",
    },
    {
      date: "June 25, 2023",
      skillPercentage: 1.0201,
      description: "Today, learned about server-side React components.",
    },
    {
      date: "June 26, 2023",
      skillPercentage: 1.0303,
      description: "Today, I learned about client-side React components.",
    },
    {
      date: "June 27, 2023",
      skillPercentage: 1.040603,
      description: "Today, I built the frontend for NeuroHabit.",
    }
  );
  console.log("Improvements", improvements);
  console.log("createdUser", createUser._id);
  const updateUser = await User.findOneAndUpdate(
    {
      _id: createUser._id,
    },
    {
      $push: { improvements: improvements },
    },
    { new: true }
  );
  console.log(updateUser);
  console.log(`🌱 db seeded!`);
}
