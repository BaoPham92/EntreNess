import '@babel/polyfill/noConflict'
import server from './server'
require('events').EventEmitter.defaultMaxListeners = 100

server.start({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server is running!`)
})