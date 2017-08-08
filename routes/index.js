var Zone = require('../models/zone');

function getZones(res){
  Zone.find(function(err, zones){
    if(!err){
        res.status(200).json(zones);
      }
      else {
        res.status(500).json({
         message: 'Error getting zones.',
         code: 500,
         error: err
       });
     }
   });
}

module.exports = function(app){
  app.get('/api/zones', function(req, res){
    getZones(res);
  });
};
