'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: '"/api"'
  // API_BASE_URL: '"http://www.libinperson.top/api"'
})

