const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const infoSchema = mongoose.Schema({
  _id:Number,
  name: {
    type: String,
    required:true
  },
  phoneno: {
    type: Number,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  hobbies: {
    type: String,
    required:true
  },
});
infoSchema.plugin(AutoIncrement);
let info = mongoose.model("userInformation", infoSchema);


module.exports = info;
