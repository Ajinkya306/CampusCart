const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

const upload = require("../middleware/upload");

const mongoose =
  require("mongoose");

/* GET ALL PRODUCTS WITH PAGINATION */

router.get(

  "/",

  async (req, res) => {

    try {

      const page =

        parseInt(req.query.page)
        || 1;

      const limit =

        parseInt(req.query.limit)
        || 8;

      const skip =

        (page - 1) * limit;

      const products =

        await Product.find()

          .sort({
            createdAt: -1,
          })

          .skip(skip)

          .limit(limit);

      const totalProducts =

        await Product.countDocuments();

      res.json({

        products,

        totalPages:

          Math.ceil(
            totalProducts / limit
          ),

        currentPage:
          page,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Failed To Fetch Products",
      });

    }

  }
);

/* ADD PRODUCT */

router.post(

  "/",

  (req, res, next) => {

    upload.array("images", 5)(

      req,

      res,

      function (err) {

        if (err) {

          console.log(
            "MULTER ERROR:"
          );

          console.log(err);

          return res.status(500).json({

            error: err.message,

          });

        }

        next();

      }

    );

  },

  async (req, res) => {

    try {

      console.log(
        "FILES:"
      );

      console.log(
        req.files
      );

      const imageUrls =

        req.files.map(
          (file) => file.path
        );

      const newProduct =

        new Product({

          ...req.body,

          images:
            imageUrls,

        });

      await newProduct.save();

      res.status(201).json(
        newProduct
      );

    } catch (error) {

      console.log(
        "BACKEND ERROR:"
      );

      console.log(error);

      res.status(500).json({

        error:
          error.message,

      });

    }

  }

);

/* GET USER PRODUCTS */

router.get(

  "/user/:email",

  async (req, res) => {

    try {

      const products =

        await Product.find({

          sellerEmail:
            req.params.email,

        }).sort({

          createdAt: -1,

        });

      res.json(products);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          "Failed To Fetch User Products",

      });

    }

  }

);
/* WISHLIST TOGGLE */

// router.put(

//   "/wishlist/:id",

//   async (req, res) => {

//     try {

//       const product =

//         await Product.findById(
//           req.params.id
//         );

//       if (!product) {

//         return res.status(404).json({
//           error:
//             "Product not found",
//         });

//       }

//       const userEmail =
//         req.body.userEmail;

//       console.log(
//         "USER EMAIL:",
//         userEmail
//       );

//       if (!userEmail) {

//         return res.status(400).json({
//           error:
//             "Email missing",
//         });

//       }

//       const cleanedWishlist =

//         (product.wishlistUsers || [])
//           .filter(Boolean);

//       const alreadyWishlisted =

//         cleanedWishlist.includes(
//           userEmail
//         );

//       if (alreadyWishlisted) {

//         product.wishlistUsers =

//           cleanedWishlist.filter(
//             (email) =>
//               email !== userEmail
//           );

//       } else {

//         product.wishlistUsers = [

//           ...cleanedWishlist,

//           userEmail,

//         ];

//       }

//       product.markModified(
//         "wishlistUsers"
//       );

//       await product.save();

//       const updatedProduct =

//         await Product.findById(
//           req.params.id
//         );

//       console.log(
//         updatedProduct.wishlistUsers
//       );

//       res.json(updatedProduct);

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({
//         error:
//           "Wishlist Failed",
//       });

//     }

//   }
// );

/* GET USER WISHLIST */

// router.get(

//   "/wishlist/user/:email",

//   async (req, res) => {

//     try {

//       const products =

//         await Product.find({

//           wishlistUsers:
//             req.params.email,

//         }).sort({
//           createdAt: -1,
//         });

//       res.json(products);

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({
//         error:
//           "Failed To Fetch Wishlist",
//       });

//     }

//   }
// );

/* EDIT PRODUCT */

router.put(

  "/edit/:id",

  async (req, res) => {

    try {

      const updatedProduct =

        await Product.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      res.json(updatedProduct);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Update Failed",
      });

    }

  }
);

/* DELETE PRODUCT */

router.delete(

  "/:id",

  async (req, res) => {

    try {

      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Product Deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Delete Failed",
      });

    }

  }
);

/* GET SINGLE PRODUCT */
/* KEEP THIS ROUTE LAST */

router.get(

  "/:id",

  async (req, res) => {

    try {

      const product =

        await Product.findById(
          req.params.id
        );

      res.json(product);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Product Not Found",
      });

    }

  }
);


/* WEBSITE STATS */

router.get(

  "/stats/all",

  async (req, res) => {

    try {

      /* TOTAL PRODUCTS */

      const totalProducts =

        await Product.countDocuments();

      /* UNIQUE COLLEGES */

      const colleges =

        await Product.distinct(
          "college"
        );

      /* UNIQUE CITIES */

      const cities =

        await Product.distinct(
          "city"
        );

      /* TOTAL USERS */

      const usersCollection =

        mongoose.connection.db.collection(
          "Registrations"
        );

      const totalUsers =

        await usersCollection.countDocuments();

      res.json({

        totalProducts,

        totalUsers,

        totalColleges:
          colleges.length,

        totalCities:
          cities.length,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          "Failed To Fetch Stats",

      });

    }

  }

);


module.exports = router;