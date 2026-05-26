const mongoose = require("mongoose");

const productSchema =
  new mongoose.Schema({

    title: String,

    description: String,

    price: Number,

    category: String,

    city: String,

    college: String,

    collegeNormalized: String,

    collegeSearch: String,

    condition: String,

    type: String,

    images: [String],

    whatsapp: String,

    sellerEmail: String,

    sellerName: String,

    // wishlistUsers: [String],

    createdAt: {

      type: Date,

      default: Date.now,

    },

  },

  {

    timestamps: true,

  }

);

/* DATABASE INDEXES */

productSchema.index({

  title: "text",

  description: "text",

  college: "text",

  city: "text",

});



module.exports =

  mongoose.model(

    "Product",

    productSchema

  );