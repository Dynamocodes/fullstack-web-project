const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema({
  date: { type: String, required: true },
  grossWpm: Number,
  netWpm: Number,
  accuracy: Number,
  time: Number,
  right: Number,
  wrong: Number,
  extra: Number,
  missing: Number,
  user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Statistic",
    },
 
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Statistic = mongoose.model("Statistic", statisticSchema);

module.exports = Statistic;