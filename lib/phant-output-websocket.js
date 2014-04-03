/**
 * phant-output-websocket
 * https://github.com/sparkfun/phant-output-websocket
 *
 * Copyright (c) 2014 SparkFun Electronics
 * Licensed under the GPL v3 license.
 */

'use strict';

/**** Module dependencies ****/
var socket = require('socket.io'),
    util = require('util'),
    events = require('events');

/**** PhantOutput prototype ****/
var app = {};

/**** Expose PhantOutput ****/
exports = module.exports = PhantOutput;

/**** Initialize a new PhantOutput ****/
function PhantOutput(config) {

  config = config || {};

  var output = {};

  util._extend(output, app);
  util._extend(output, events.EventEmitter.prototype);
  util._extend(output, config);

  if(output.server) {
    output.io = socket.listen(output.server);
  }

  return output;

}

/**** Defaults ****/
app.name = 'phant websocket output';
app.io = false;
app.server = false;

app.write = function(id, data) {

  if(! this.io) {
    this.emit('error', 'socket.io init failed');
    return;
  }

  this.io.sockets.in(id).emit('data', data);

};
