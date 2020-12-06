const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userAgent = { "User-Agent": "video-games-on-RAWG-react-app (GitHub)" };

const optionsTrending = {
  method: "GET",
  headers: userAgent,
  url: "https://api.rawg.io/api/games/lists/main",
  qs: {
    ordering: "-relevance",
    discover: true,
    page_size: 10,
  },
};
const optionsVideogame = {
  method: "GET",
  headers: userAgent,
  url: undefined,
};

let parsedResult;

async function apiCall(options) {
  function rawgRequest() {
    return new Promise(function (resolve, reject) {
      request(options, function (error, response, body) {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  try {
    parsedResult = await rawgRequest();
  } catch (e) {
    console.error(e);
  }
  return parsedResult;
}

app.get("/api/search/:query", async (req, res) => {
  const query = req.params.query;
  console.log(query);

  const getSearchResults = async () => {
    optionsVideogame.url = `https://api.rawg.io/api/games?search=${query}`;
    return await apiCall(optionsVideogame);
  };

  const results = await getSearchResults();

  res.set("Cache-Control", "no-cache");
  res.json(results);
  console.log(`/api/search/${query} endpoint has been called!`);
});

app.get("/api/videogame/:rawgId", async (req, res) => {
  const id = req.params.rawgId.match(/\d+/);
  const getPrimaryDetails = async () => {
    optionsVideogame.url = `https://api.rawg.io/api/games/${id}`;
    return await apiCall(optionsVideogame);
  };
  const getScreenshots = async () => {
    optionsVideogame.url = `https://api.rawg.io/api/games/${id}/screenshots`;
    return await apiCall(optionsVideogame);
  };
  const getSuggested = async () => {
    optionsVideogame.url = `https://api.rawg.io/api/games/${id}/suggested`;
    return await apiCall(optionsVideogame);
  };
  const getReviews = async () => {
    optionsVideogame.url = `https://api.rawg.io/api/games/${id}/reviews`;
    return await apiCall(optionsVideogame);
  };
  const getYoutube = async () => {
    optionsVideogame.url = `https://api.rawg.io/api/games/${id}/youtube`;
    return await apiCall(optionsVideogame);
  };
  const getDevTeam = async () => {
    optionsVideogame.url = `https://api.rawg.io/api/games/${id}/development-team`;
    return await apiCall(optionsVideogame);
  };

  const primary = await getPrimaryDetails();
  const secondary = await Promise.all([
    getScreenshots(),
    getSuggested(),
    getReviews(),
    getYoutube(),
    getDevTeam(),
  ]);

  const detailsCollected = {
    ...primary,
    screenshots:
      parseInt(primary.screenshots_count) > 0 ? secondary[0].results : [],
    suggested:
      parseInt(primary.suggestions_count) > 0 ? secondary[1].results : [],
    reviews: parseInt(primary.reviews_count) > 0 ? secondary[2].results : [],
    youtube: parseInt(primary.youtube_count) > 0 ? secondary[3].results : [],
    devteam: parseInt(primary.creators_count) > 0 ? secondary[4].results : [],
  };

  res.set("Cache-Control", "no-cache");
  res.json(detailsCollected);
  console.log(`/api/videogame/${id} endpoint has been called!`);
});

app.get("/api/trending", async (req, res) => {
  res.set("Cache-Control", "no-cache");
  res.json(await apiCall(optionsTrending));
  console.log("/api/trending endpoint has been called!");
});

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
