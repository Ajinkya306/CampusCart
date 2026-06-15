const express =
  require("express");

const jwt =
  require("jsonwebtoken");

const router =
  express.Router();

const User =
  require("../models/user");

/* JWT TOKEN */

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

/* SAVE GOOGLE USER */

// router.post(

//   "/google-login",

//   async (req, res) => {

//     try {

//       const {

//         name,

//         email,

//         photo,

//       } = req.body;

//       let existingUser =

//         await User.findOne({

//           email,

//         });

//       if (!existingUser) {

//         existingUser =

//           await User.create({

//             name,

//             email,

//             photo,

//           });

//       }

//       res.json({

//         success: true,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         error:
//           "Google Login Failed",

//       });

//     }

//   }

// );

module.exports =
  router;