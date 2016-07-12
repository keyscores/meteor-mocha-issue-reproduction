import Future from 'fibers/future';
import chai from 'chai';

describe('False positive when using futures', function (  ) {
  it('Reference Sync: this is a true passing test.', function (done) {
    Meteor.call('syncMethod', function(err, res){
      if (err){
        console.log("error: ", err);
        chai.assert.strictEqual( 1, 2 )
      }else{
        console.log('result: ', res);
        chai.assert.strictEqual( res.foo, 'Hello World' )
      }
      done();
    });
  });

  it('Broken sync: with futures it leads to false positive, the method is broken.', function (done) {
    var fut = new Future();

    Meteor.call('brokenSyncMethod', function(err, res){
      if ( err ){
        fut.return(err);

      }else{
        fut.return(res);
      }

      done();
    });

    var result  = fut.wait();
    chai.assert.equal( result.foo, 'Hello World')


  });

  it('Reference Async: this is a true passing test.', function (done) {
    Meteor.call('asyncMethod', function(err, res){
      if (err){
        console.log("error: ", err);
        chai.assert.strictEqual( 1, 2 )
      }else{
        console.log('result: ', res);
        chai.assert.strictEqual( res.foo, 'Hello World' )
      }
      done();
    });
  });

  it('Broken Async: with futures it leads to false positive, the method is broken.', function (done) {
    var fut = new Future();

    Meteor.call('brokenAsyncMethod', function(err, res){
      if ( err ){
        fut.return(err);

      }else{
        fut.return(res);
      }

      done();
    });

    var result  = fut.wait();
    chai.assert.equal( result.foo, 'Hello World')


  });

});

describe('Assertion failing in callback, shows timeout error.', function (  ) {

  it('setTimeout: this is a correct passing test.', function (done) {
    Meteor.call('asyncMethod', function(err, res){
      if (err){
        console.log("error: ", err);
        chai.assert.strictEqual( 1, 2 )

      }else{
        console.log('result: ', res);
        chai.assert.strictEqual( res.foo, 'Hello World' )
      }
      done();
    });
  });

  it('practical meteor timeout instead of reporting error.', function (done) {
    Meteor.call('asyncMethod', function(err, res){
      if (err){
        console.log("error: ", err);
         chai.assert.strictEqual( 1, 2 )

      }else{
        console.log('result: ', res);
        chai.assert.strictEqual( res.foo, 'incorrect result' )
      }
      done();
    });
  });
});
