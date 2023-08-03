import Area from "./models/Area.js";
import Improvement from "./models/Improvement.js";
import User from "./models/User.js";
import { improvementsData } from "./seed-data/improvement-seeds.js";
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

  const improvementsLarge = await Improvement.create(improvementsData);
  const improvementsMedium = await Improvement.create(improvementsData);
  const improvementsSmall = await Improvement.create(improvementsData);

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
    { $push: { improvements: improvementsLarge } },
    { new: true }
  );
  const updateAreaTwo = await Area.findOneAndUpdate(
    { _id: createAreaTwo._id },
    { $push: { improvements: improvementsMedium.slice(0, 22) } },
    { new: true }
  );
  const updateAreaThree = await Area.findOneAndUpdate(
    { _id: createAreaThree._id },
    { $push: { improvements: improvementsSmall.slice(0, 14) } },
    { new: true }
  );

  console.log(`🌱 db seeded!`);
}
