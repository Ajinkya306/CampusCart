const errorHandler = (

  err,

  req,

  res,

  next

) => {

  console.error(err);

  /* MULTER FILE SIZE ERROR */

  if (

    err.code === "LIMIT_FILE_SIZE"

  ) {

    return res.status(400).json({

      error:
        "Image Size Must Be Less Than 3MB",

    });

  }

  /* INVALID FILE TYPE */

  if (

    err.message?.includes(
      "Only JPG"
    )

  ) {

    return res.status(400).json({

      error:
        err.message,

    });

  }

  /* DEFAULT ERROR */

  res.status(500).json({

    error:
      "Internal Server Error",

  });

};

module.exports =
  errorHandler;