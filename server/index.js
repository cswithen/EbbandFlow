const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { db } = require("./db/index");
const sessionStore = new SequelizeStore({ db });
const PORT = 3000;

const app = express();
module.exports = app;

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findbyPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const generateApp = () => {
  app.enable("trust proxy");

  //logging middleware
  const morgan = require("morgan");
  app.use(morgan("dev"));

  //bodyParsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: "whatASecret",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  //api routes
  app.use("/api", require("./api"));
  app.use("/auth", require("./auth"));

  //static assets
  app.use(express.static(path.join(__dirname, "../public")));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "public/index.html"))
  );

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  app.use(function (error, req, res, next) {
    console.error(error);
    console.error(error.stack);
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error.");
  });
};

const appListen = () => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
};

// const dbSync = async () => await db.sync()

async function init() {
  await sessionStore.sync();
  await db.sync();
  await generateApp();
  await appListen();
}

init();
