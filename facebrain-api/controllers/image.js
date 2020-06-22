const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "30dcee6bcf094d3880c92ba0a9a4ba46",
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(data => {
	  res.json(data);
  })
  .catch(err => res.status(400).json("unable to connect to api"))
};

const handleImage = (req, res, database) => {
  const { id } = req.body;
  database("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
