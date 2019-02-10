const assert = require('assert');
const FoscamHdClient = require('../lib/foscamHdClient');

describe('FoscamHdClient', function(){

  describe('constructor', function(){

    describe('validation', function(){

      describe('when all config parameters are supplied and valid', function(){

        it('should not throw an error', function(){
          assert.doesNotThrow(
            function(){
              new FoscamHdClient({protocol:'http', host:'192.168.1.123', port:1138, user:'user', pass:'pass'});
            },
            Error
          );
        });

      });

      describe('when all optional config parameters are omitted', function(){

        it('should not throw an error', function(){
          assert.doesNotThrow(
            function(){
              new FoscamHdClient({host:'192.168.1.123', user:'user', pass:'pass'});
            },
            Error
          );
        });

      });

      describe('protocol is omitted', function(){

        it('should default to http', function(){
          let client = new FoscamHdClient({host:'localhost', user:'user', pass:'pass'});
          assert(client.config.protocol === 'http');
        });
      });

      describe('protocol is invalid', function(){

        it('should throw an error', function(){
          // empty string
          assert.throws(
            function(){
              new FoscamHdClient({protocol:'', host:'192.168.1.123', user:'user', pass:'pass'});
            },
            Error
          );
          // null
          assert.throws(
            function(){
              new FoscamHdClient({protocol:null, host:'192.168.1.123', user:'user', pass:'pass'});
            },
            Error
          );
          // not a string
          assert.throws(
            function(){
              new FoscamHdClient({protocol:1234, host:'192.168.1.123', user:'user', pass:'pass'});
            },
            Error
          );
          // not supported
          assert.throws(
            function(){
              new FoscamHdClient({protocol:'smtp', host:'192.168.1.123', user:'user', pass:'pass'});
            },
            Error
          );
        });

      });

      describe('host is omitted or invalid', function(){

        it('should throw an error', function(){
          assert.throws(
            function(){
              new FoscamHdClient({port:1138, user:'user', pass:'pass'});
            },
            Error
          );

          assert.throws(
            function(){
              new FoscamHdClient({host:null, port:1138, user:'user', pass:'pass'});
            },
            Error
          );

          assert.throws(
            function(){
              new FoscamHdClient({host:123, port:1138, user:'user', pass:'pass'});
            },
            Error
          );
        });

      });

      describe('port is omitted', function(){

        it('should default to 80', function(){
          let client = new FoscamHdClient({host:'localhost', user:'user', pass:'pass'});
          assert(client.config.port === 80);
        });
      });

      describe('port is invalid', function(){

        it('should throw an error', function(){
          // empty string
          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.123', port:'', user:'user', pass:'pass'});
            },
            Error
          );
          // null
          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.123', port:null, user:'user', pass:'pass'});
            },
            Error
          );
          // not a number
          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.123', port:'foo', user:'user', pass:'pass'});
            },
            Error
          );
          // out of range
          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.123', port:70000, user:'user', pass:'pass'});
            },
            Error
          );
        });

      });

      describe('user is omitted or invalid', function(){

        it('should throw an error', function(){
          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.1', port:1138, pass:'pass'});
            },
            Error
          );

          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.1', port:1138, user:null, pass:'pass'});
            },
            Error
          );

          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.1', port:1138, user:'', pass:'pass'});
            },
            Error
          );

          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.1', port:1138, user:123, pass:'pass'});
            },
            Error
          );
        });

      });

      describe('pass is omitted or invalid', function(){

        it('should throw an error', function(){
          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.1', port:1138, user:'user'});
            },
            Error
          );

          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.1', port:1138, user:'user', pass:null});
            },
            Error
          );

          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.1', port:1138, user:'user', pass:''});
            },
            Error
          );

          assert.throws(
            function(){
              new FoscamHdClient({host:'192.168.1.1', port:1138, user:'user', pass:1234});
            },
            Error
          );
        });

      });

    });

  });

});
