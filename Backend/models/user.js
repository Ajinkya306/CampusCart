const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema(

    {

      name: {

        type: String,

      },

      email: {

        type: String,

        required: true,

        unique: true,

      },

      photo: {

        type: String,

      },

    },

    {

      timestamps: true,

    }

  );

module.exports =

  mongoose.models.User ||

  mongoose.model(

    "User",

    userSchema

  );