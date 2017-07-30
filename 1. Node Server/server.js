// Not supported with Node 6

/*import http from 'http';
import express from 'express';
import sockjs from 'sockjs' */


let ServerHandler = require('./lib/ServerHandler');

let server = new ServerHandler();
server.initSockServer();
server.initExpressServer();