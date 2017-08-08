module.exports = {
  port: process.env.PORT || 3000,
  client:{
    cosmosdb:{
      uri: "mongodb://{cosmosdbURI}"
    }
  }
};
