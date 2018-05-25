require('dotenv').config()

exports.Koa = require('koa')

exports.parse = require('co-body')
exports.multipartParse = require('co-busboy')

exports.jwtDecode = require('jwt-decode')

const { Nuxt, Builder } = require('nuxt')

exports.Nuxt = Nuxt
exports.Builder = Builder

exports.config = require('../../nuxt.config.js')

