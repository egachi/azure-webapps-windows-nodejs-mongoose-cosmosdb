var mongoose = require('mongoose');

module.exports = mongoose.model('Zone', {
  title:{
    type: String,
    default:''
  }
});
