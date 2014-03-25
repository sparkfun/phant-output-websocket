/**
 * phant-output-repeater
 * https://github.com/sparkfun/phant-output-repeater
 *
 * Copyright (c) 2014 SparkFun Electronics
 * Licensed under the GPL v3 license.
 */

'use strict';

/**** Module dependencies ****/
var socket = require('socket.io'),
    _ = require('underscore'),
    events = require('events');

/**** PhantOutput prototype ****/
var app = {};

/**** Expose PhantOutput ****/
exports = module.exports = PhantOutput;

/**** Initialize a new PhantOutput ****/
function PhantOutput(config) {

  config = config || {};

  var output = {};

  _.extend(output, app);
  _.extend(output, events.EventEmitter.prototype);
  _.extend(output, config);

  if(output.server) {
    output.io = socket.listen(output.server);
  }

  return output;

}

/**** Defaults ****/
app.name = 'phant output repeater';
app.io = false;
app.server = false;

app.receive = function(id, data) {

  if(! this.io) {
    this.emit('error', 'socket.io init failed');
    return;
  }

  this.io.sockets.in(id).emit('data', data);

};
