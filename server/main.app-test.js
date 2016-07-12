import Future from 'fibers/future';
import chai from 'chai';

describe('False positive in async methods', function (  ) {
  it('setTimeout: this is a correct passing test.', function (done) {
    Meteor.call('workingSetTimeout', function(err, res){
      if (err){
        console.log("error: ", err);
        chai.assert.strictEqual( 1, 2 )
      }else{
        console.log('result: ', res);
        chai.assert.strictEqual( res.foo, 'Hello Word' )
      }
      done();
    });
  });

  it('setTimeout: this is false positive, the method is broken.', function (done) {
    var fut = new Future();

    Meteor.call('brokenSetTimeout', function(err, res){
      if ( err ){
        fut.return(err);

      }else{
        fut.return(res);
      }

      done();
    });

    var result  = fut.wait();
    chai.assert.equal( result.foo, 'Hello Word')


  });

  it('Request: this is a correct passing test.', function (done) {
    Meteor.call('correctRequest', function(err, res){
      if (err){
        console.log("error: ", err);
        chai.assert.strictEqual( 1, 2 )

      }else{
        console.log('result: ', res);
        chai.assert.strictEqual( res.foo, 'Hello Word' )
      }
      done();
    });
  });

  it('Request: this is false positive, the method is broken.', function (done) {
    var fut = new Future();

    Meteor.call('brokenRequest', function(err, res){
      if ( err ){
        fut.return(err);

      }else{
        fut.return(res);
      }

      done();
    });

    var result  = fut.wait();
    chai.assert.equal( result.foo, 'Hello Word')
  });
});

describe('Assertion failing in callback, shows timeout error.', function (  ) {

  it('setTimeout: this is a correct passing test.', function (done) {
    Meteor.call('workingSetTimeout', function(err, res){
      if (err){
        console.log("error: ", err);
        chai.assert.strictEqual( 1, 2 )

      }else{
        console.log('result: ', res);
        chai.assert.strictEqual( res.foo, 'Hello Word' )
      }
      done();
    });
  });

  it('practical meteor timeout instead of reporting error.', function (done) {
    Meteor.call('workingSetTimeout', function(err, res){
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
