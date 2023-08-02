import Area from "./models/Area.js";
import Improvement from "./models/Improvement.js";
import User from "./models/User.js";
export default async function seedDB() {
  await User.deleteMany();
  await Improvement.deleteMany();
  await Area.deleteMany();

  const createUserTest = await User.create({
    username: "testuser",
    password: "password",
  });

  const createAreaOne = await Area.create({
    area: "Web Development",
  });
  const createAreaTwo = await Area.create({
    area: "Music Production",
  });
  const createAreaThree = await Area.create({
    area: "Marketing",
  });

  const generateSkill = (index) => {
    const exponentialGain = 1.01 ** index;
    if (index === 0) {
      return 1;
    }

    return 1 * exponentialGain;
  };
  const improvements = await Improvement.create(
    {
      date: "June 23, 2023",
      skillPercentage: generateSkill(0),
      description: "Today, I learned about interfaces in TypeScript.",
    },
    {
      date: "June 24, 2023",
      skillPercentage: generateSkill(1),
      description: "Today, I designed NeuroHabit.",
    },
    {
      date: "June 25, 2023",
      skillPercentage: generateSkill(2),
      description: "Today, learned about server-side React components.",
    },
    {
      date: "June 26, 2023",
      skillPercentage: generateSkill(3),
      description: "Today, I learned this new thing...",
    },
    {
      date: "June 27, 2023",
      skillPercentage: generateSkill(4),
      description: "Today, I learned this new thing...",
    },
    {
      date: "June 28, 2023",
      skillPercentage: generateSkill(5),
      description: "Today, I learned this new thing...",
    },
    {
      date: "June 29, 2023",
      skillPercentage: generateSkill(6),
      description: "Today, I learned this new thing...",
    },
    {
      date: "June 30, 2023",
      skillPercentage: generateSkill(7),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 1, 2023",
      skillPercentage: generateSkill(8),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 2, 2023",
      skillPercentage: generateSkill(9),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 3, 2023",
      skillPercentage: generateSkill(10),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 4, 2023",
      skillPercentage: generateSkill(11),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 5, 2023",
      skillPercentage: generateSkill(12),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 6, 2023",
      skillPercentage: generateSkill(13),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 7, 2023",
      skillPercentage: generateSkill(14),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 8, 2023",
      skillPercentage: generateSkill(15),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 9, 2023",
      skillPercentage: generateSkill(16),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 10, 2023",
      skillPercentage: generateSkill(17),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 11, 2023",
      skillPercentage: generateSkill(18),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 12, 2023",
      skillPercentage: generateSkill(19),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 13, 2023",
      skillPercentage: generateSkill(20),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 14, 2023",
      skillPercentage: generateSkill(21),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 15, 2023",
      skillPercentage: generateSkill(22),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 16, 2023",
      skillPercentage: generateSkill(23),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 17, 2023",
      skillPercentage: generateSkill(24),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 18, 2023",
      skillPercentage: generateSkill(25),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 19, 2023",
      skillPercentage: generateSkill(26),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 20, 2023",
      skillPercentage: generateSkill(27),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 21, 2023",
      skillPercentage: generateSkill(28),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 22, 2023",
      skillPercentage: generateSkill(29),
      description: "Today, I learned this new thing...",
    },
    {
      date: "July 23, 2023",
      skillPercentage: generateSkill(30),
      description: "Today, I learned this new thing...",
    }
  );

  const updateUserTest = await User.findOneAndUpdate(
    {
      _id: createUserTest._id,
    },
    {
      $push: {
        areas: { $each: [createAreaOne, createAreaTwo, createAreaThree] },
      },
    },
    { new: true }
  );

  const updateAreaOne = await Area.findOneAndUpdate(
    { _id: createAreaOne._id },
    { $push: { improvements: improvements } },
    { new: true }
  );
  // const updateAreaTwo = await Area.findOneAndUpdate(
  //   { _id: createAreaTwo._id },
  //   { $push: { improvements: improvements.slice(0, 22) } },
  //   { new: true }
  // );
  // const updateAreaThree = await Area.findOneAndUpdate(
  //   { _id: createAreaThree._id },
  //   { $push: { improvements: improvements.slice(0, 14) } },
  //   { new: true }
  // );

  console.log(`🌱 db seeded!`);
}
