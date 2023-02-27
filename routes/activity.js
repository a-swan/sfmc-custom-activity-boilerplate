const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'utils', 'jwtDecoder.js'));

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );
  logData(req);
  res.send(200, 'Edit');
};

/*
* POST Handler for /save/ route of Activity.
*/
exports.save = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );
  logData(req);
  res.send(200, 'Save');
};

/*
* POST Handler for /execute/ route of Activity.
*/
exports.execute = function (req, res) {

  // example on how to decode JWT
  JWT(req.body, process.env.jwtSecret, (err, decoded) => {

      // verification error -> unauthorized request
      if (err) {
          console.error(err);
          return res.status(401).end();
      }

      if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
          
          // decoded in arguments
          var decodedArgs = decoded.inArguments[0];
          
          logData(req);
          res.send(200, 'Execute');
      } else {
          console.error('inArguments invalid.');
          return res.status(400).end();
      }
  });
};


/*
* POST Handler for /publish/ route of Activity.
*/
exports.publish = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );
  logData(req);
  res.send(200, 'Publish');
};

/*
* POST Handler for /validate/ route of Activity.
*/
exports.validate = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );
  logData(req);
  res.send(200, 'Validate');
};