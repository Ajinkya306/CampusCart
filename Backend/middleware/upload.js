const multer =
  require("multer");

const cloudinary =
  require("cloudinary").v2;

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

/* CLOUDINARY CONFIG */

cloudinary.config({

  cloud_name:
    process.env.CLOUD_NAME,

  api_key:
    process.env.CLOUD_API_KEY,

  api_secret:
    process.env.CLOUD_API_SECRET,

});

/* CLOUDINARY STORAGE */

const storage =

  new CloudinaryStorage({

    cloudinary,

    params: {

      folder:
        "campuscart",

      allowed_formats: [

        "jpg",

        "jpeg",

        "png",

        "webp",

      ],

    },

  });

/* FILE TYPE VALIDATION */

const fileFilter = (

  req,

  file,

  cb

) => {

  const allowedMimeTypes = [

    "image/jpeg",

    "image/jpg",

    "image/png",

    "image/webp",

  ];

  if (

    allowedMimeTypes.includes(
      file.mimetype
    )

  ) {

    cb(null, true);

  } else {

    cb(

      new Error(

        "Only JPG, JPEG, PNG and WEBP images are allowed"

      ),

      false

    );

  }

};

/* MULTER CONFIG */

const upload =

  multer({

    storage,

    fileFilter,

    limits: {

      /* 3MB MAX */

      fileSize:
        3 * 1024 * 1024,

    },

  });

module.exports =
  upload;