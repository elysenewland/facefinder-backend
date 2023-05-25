const Clarifai = require("clarifai");

// Initialize the Clarifai API client with API key
// Face Detect Model ID: "a403429f2ddf4b49b307e318f00e528b"
const app = new Clarifai.App({
  apiKey: "5714e878891a4e2a97a04f80f6f05828",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: "face-detection",
        name: "face-detection",
        version: "6dc7e46bc9124c5c8824be4822abe105",
        type: "visual-detector",
      },
      req.body.input
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Unable to get entries."));
};

module.exports = {
  handleImage,
  handleApiCall,
};
