const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

const upload = require("../middleware/upload");

const {
  cloudinary,
} = require("../config/cloudinary");

const mongoose =
  require("mongoose");

const auth =
  require("../middleware/auth");


const User =
  require("../models/user");




/* GET ALL PRODUCTS WITH PAGINATION */

router.get(

  "/",

  async (req, res) => {

    try {

      console.log("upload error hit");

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
            _id: -1,
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

          console.log("MULTER ERROR:");
          console.log(err);

          if (err.code === "LIMIT_FILE_SIZE") {

            return res.status(400).json({

              error:
                "Each image must be smaller than 5 MB.",

            });

          }

          if (err.code === "LIMIT_UNEXPECTED_FILE") {

            return res.status(400).json({

              error:
                "You can upload a maximum of 5 images.",

            });

          }

          return res.status(500).json({

            error:
              "Image upload failed. Please try again.",

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

      console.log("BODY:");
      console.log(req.body);

      /* PHONE VALIDATION */

      if (

        !/^[0-9]{10}$/.test(
          req.body.whatsapp
        )

      ) {

        console.log("❌ Invalid WhatsApp Number:", req.body.whatsapp);

        return res.status(400).json({

          error:
            "Invalid WhatsApp Number",

        });

      }

      /* TITLE VALIDATION */

      if (

        !req.body.title ||

        req.body.title.trim().length < 3

      ) {
        console.log("❌ Title Too Short:", req.body.whatsapp);

        return res.status(400).json({

          error:
            "Title Too Short",

        });

      }

      /* PRICE VALIDATION */

      if (

        !req.body.price ||

        Number(req.body.price) <= 0

      ) {
        console.log("❌ Invalid Price:", req.body.whatsapp);

        return res.status(400).json({

          error:
            "Invalid Price",

        });

      }

      /* DESCRIPTION VALIDATION */

      if (

        !req.body.description ||

        req.body.description.trim().length < 5

      ) {
        console.log("❌ Descpition Too Short:", req.body.whatsapp);

        return res.status(400).json({

          error:
            "Description Too Short",

        });

      }

      /* IMAGE VALIDATION */

      if (

        !req.files ||

        req.files.length === 0

      ) {
        console.log("❌ Atleast one image is required:", req.body.whatsapp);

        return res.status(400).json({

          error:
            "At Least One Image Required",

        });

      }

      const imageUrls =

        Array.isArray(req.files)

          ? req.files.map(
              (file) => file.path
            )

          : [];


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

          sellerName:
            req.body.sellerName,

          sellerEmail:
            req.body.sellerEmail,

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

          _id: -1,

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

      const existingProduct =

        await Product.findById(
          req.params.id
        );

      if (!existingProduct) {

        return res.status(404).json({

          error:
            "Product Not Found",

        });

      }

      /* OWNERSHIP CHECK */

      if (

        existingProduct.sellerEmail !==

        req.body.sellerEmail

      ) {

        return res.status(403).json({

          error:
            "Unauthorized",

        });

      }

      const updatedData = {

        ...req.body,

        collegeNormalized:

          normalizeCollege(
            req.body.college
          ),

        collegeSearch:

          generateCollegeSearch(
            req.body.college
          ),

      };

      const updatedProduct =

        await Product.findByIdAndUpdate(

          req.params.id,

          updatedData,

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

      const product =

        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({

          error:
            "Product Not Found",

        });

      }

      /* OWNERSHIP CHECK */

      if (

        product.sellerEmail !==

        req.body.sellerEmail

      ) {

        return res.status(403).json({

          error:
            "Unauthorized",

        });

      }

      /* DELETE IMAGES FROM CLOUDINARY */

      if (

        product.images &&

        product.images.length > 0

      ) {

        for (const imageUrl of product.images) {

          try {

            const publicId = imageUrl

            .split("/upload/")[1]

            .replace(/^v\d+\//, "")

            .replace(/\.[^/.]+$/, "");

          console.log("Image URL:", imageUrl);

          console.log("Public ID:", publicId);

          const result =

            await cloudinary.uploader.destroy(
              publicId
            );

          console.log(
            "Cloudinary Result:",
            result
          );

          } catch (err) {

            console.log(

              "Cloudinary Delete Failed:",

              err.message

            );

          }

        }

      }

      /* DELETE PRODUCT FROM DATABASE */

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

/* WEBSITE STATS */

router.get(

  "/stats/all",

  async (req, res) => {

    try {

      const totalProducts =

        await Product.countDocuments();

      const colleges =

        await Product.distinct(
          "college"
        );

      const cities =

        await Product.distinct(
          "city"
        );

      const totalUsers =

        await User.countDocuments();

      res.json({

        totalProducts,

        totalUsers:
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

module.exports = router;