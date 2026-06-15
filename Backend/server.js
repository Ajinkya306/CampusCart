const userRoutes =
  require("./routes/userRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

console.log(
  process.env.CLOUD_API_KEY
);

const productRoutes = require("./routes/productRoutes");

const rateLimit =
  require("express-rate-limit");

const app = express();

const authRoutes =
  require("./routes/authRoutes");


const helmet =
  require("helmet");






const errorHandler =
  require(
    "./middleware/errorHandler"
  );


/* RATE LIMITER */

const limiter =

  rateLimit({

    windowMs:
      15 * 60 * 1000,

    max: 200,

    message: {

      error:
        "Too Many Requests. Please Try Again Later.",

    },

    standardHeaders: true,

    legacyHeaders: false,

  });

/* CORS CONFIG */

app.use(

  cors({

    origin: [

      "https://campus-cart-pi.vercel.app",

      "https://campus-cart-git-student-count-feature-ajinkya-s-projects3.vercel.app",

      "http://localhost:5173",

    ],

    methods: [

      "GET",

      "POST",

      "PUT",

      "DELETE",

    ],

    credentials: true,

  })

);

app.use(express.json());

/* SECURITY MIDDLEWARES */

app.use(helmet());





app.use(limiter);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);


app.get("/", (req, res) => {
  res.send(
    "CampusCart Backend Running"
  );
});


/* GLOBAL ERROR HANDLER */

app.use(errorHandler);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("MongoDB Connected")
  )
  .catch((err) =>
    console.log(err)
  );



const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});