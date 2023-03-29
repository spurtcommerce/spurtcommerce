/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/

const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');




require("dotenv").config({ path: `${process.env.ENVIRONMENT}` });
const webpack = require('webpack')

const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {}

module.exports =withPlugins([[withImages()]]),{
    rewrites: async () => nextI18NextRewrites(localeSubpaths),

    webpack: (config, {dev}) => {
        config.plugins.push(
            new webpack.EnvironmentPlugin(process.env)
          )
      
        return config
      }
    
}

module.exports = {
  images: {
    
    domains: ["3.109.173.92"],
  },
};