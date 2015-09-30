'use strict';
(function() {
    var chai = require('chai'),
        should = chai.should(),
        expect = chai.expect,
        sinon = require('sinon');

    var HttpAdapter = require('../../lib/httpadapter/httpadapter.js');

    describe('HttpAdapter', function() {

        describe('#constructor' , function() {

            it('if no http specified must instanciate one', function() {
                var http = require('http');

                var httpAdapter = new HttpAdapter();

                httpAdapter.http.should.equal(http);

            });

            it('if client specified must use it', function() {
                var mockedHttp = {'test' : 1};

                var httpAdapter = new HttpAdapter(mockedHttp);

                httpAdapter.http.should.equal(mockedHttp);
            });

        });

        describe('#get' , function() {

            it('get must call http  request', function() {
                var http = { request: function () {} };
                var mock = sinon.mock(http);
                mock.expects('request').once().returns({
                    end: function() {},
                    on: function() { return this; }
                });

                var httpAdapter = new HttpAdapter(http);

                httpAdapter.get('http://test.fr');

                mock.verify();
            });


            it('get must call http request with set options', function() {
                var http = { request: function () {} };
                var mock = sinon.mock(http);
                mock.expects('request')
                .withArgs({ headers: { "user-agent": "Bla blubber" }, host: "test.fr", path: "/?" })
                .once().returns({
                    end: function() {},
                    on: function() { return this; }
                });

                var httpAdapter = new HttpAdapter(http,
                  {headers: {
                    'user-agent': 'Bla blubber'
                  }
                });

                httpAdapter.get('http://test.fr');

                mock.verify();
            });

        });

    });

})();
