const express = require("express");

const router = express.Router();

const User = require("../models/user");

/* REGISTER USER */

router.post(

  "/register",

  async (req, res) => {

    try {

      const {

        name,

        email,

        photo,

      } = req.body;

      const existingUser =

        await User.findOne({

          email,

        });

      if (!existingUser) {

        await User.create({

          name,

          email,

          photo,

        });

      }

      res.json({

        success: true,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          "User Registration Failed",

      });

    }

  }

);

module.exports =
  router;