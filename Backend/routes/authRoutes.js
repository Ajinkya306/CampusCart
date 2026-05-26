const express =
  require("express");

const jwt =
  require("jsonwebtoken");

const router =
  express.Router();

router.post(

  "/token",

  async (req, res) => {

    try {

      const { email } =
        req.body;

      const token =

        jwt.sign(

          { email },

          process.env.JWT_SECRET,

          {

            expiresIn: "7d",

          }

        );

      res.json({ token });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          "Token Generation Failed",

      });

    }

  }

);

module.exports =
  router;