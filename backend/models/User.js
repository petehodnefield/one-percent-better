import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 1,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20,
  },
  improvements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Improvement",
    },
  ],
});

userSchema.pre("save", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Hashing data before updating into database
userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.password) {
      const hashed = await bcrypt.hash(this._update.password, saltRounds);
      this._update.password = hashed;
    }
    next();
  } catch (err) {
    return next(err);
  }
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
