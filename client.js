const { Client } = require('@elastic/elasticsearch')
const config = require('config');
const elasticConfig = config.get('elastic');
console.log(elasticConfig,'Elasticcongig')
const client = new Client({
  cloud: {
    id: elasticConfig.cloudID
  },
  auth: {
    username: elasticConfig.username,
    password: elasticConfig.password
  }
})
module.exports = client;