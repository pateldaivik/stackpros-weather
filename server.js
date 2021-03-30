const express = require("express");
const request = require("request");
const moment = require("moment");
const app = express();
var cors = require("cors");

app.use(cors());
app.get("/", (req, response) => {
  request.get(
    "https://www.metaweather.com/api/location/2487956/2013/4/30/",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      result = body.map((data) => {
        resp = {};
        resp["id"] = data.id;
        resp["min_temp"] = data.min_temp;
        resp["max_temp"] = data.max_temp;
        resp["weather_state_name"] = data.weather_state_name;
        resp["time"] = moment.utc(data.created).format("HH:mm:ss");
        return resp;
      });
      return response.status(200).json(result);
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
