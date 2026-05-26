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

        req.files?.map(
          (file) => file.path
        ) || [];

      /* NORMALIZE COLLEGE */

      const normalizeCollege =
        (college) => {

          return college

            ?.toLowerCase()

            ?.replace(/[^a-zA-Z0-9 ]/g, "")

            ?.replace(/\s+/g, " ")

            ?.trim();

        };

      /* GENERATE SEARCHABLE COLLEGE */

      const generateCollegeSearch =
        (college) => {

          const normalized =

            normalizeCollege(college);

          return normalized;

        };

      const newProduct =

        new Product({

          ...req.body,

          images: imageUrls,

          collegeNormalized:

            normalizeCollege(
              req.body.college
            ),

          collegeSearch:

            generateCollegeSearch(
              req.body.college
            ),

        });

      /* VERY IMPORTANT */

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

      /* UNIQUE USERS */

      const totalUsers =

        await Product.distinct(
          "sellerEmail"
        );

      const uniqueUsersCount =
        totalUsers.length;

      res.json({

        totalProducts,

        totalUsers:
          uniqueUsersCount,

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