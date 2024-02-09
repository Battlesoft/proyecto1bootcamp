// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// ----------------
//     MY CODE
// ----------------

// Maneja solicitud en ruta "api/:date?"
app.get("api/:date?", function(req,res){
  const {date} = req.params;

  // si no hay fecha devuelve la actual
  if (!date) {
    const currentDate = new Date();
    return res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString});
  }

  const parsedDate = new Date(date);

  //  Si no es valido la fecha devolverá el error "Invalid Date"
  if (isNaN(parsedDate.getTime())) {
    return res.json({error: "Invalid Date"});
  }

  // Si es valido devuelve el UTC y el unix timestap
  res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString()});
});






// -----------------------------------------------------


app.get("/api/date", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
