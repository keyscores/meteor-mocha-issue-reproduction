import { Meteor } from 'meteor/meteor';
import Request from 'request-promise';
import Future from 'fibers/future';

Meteor.methods({
  workingSetTimeout:function(){

    var fut = new Future();

    Meteor.setTimeout(function(){
       fut.return({ foo: 'Hello World'});
    }, 500);

    return fut.wait();

  },
  brokenSetTimeout:function(){

    var fut = new Future();

    //TODO: BUG: replace typo Meteo for Meteor
    Meteo.setTimeout(function(){
       fut.return({ foo: 'Hello World'});
    }, 500);

    return fut.wait();

  },
  correctRequest:function(){

    var fut = new Future();


    Request({
      method: 'GET',
      json: true,
      uri: 'http://mockbin.org/bin/7c895090-701d-4bed-b2c6-63a60b45c574'
    })
     .then(function (response) {
        //  console.log(response)
        fut.return(response);
     });

     return fut.wait();

   },
   brokenRequest:function(){

     var fut = new Future();
     Request({
       method: 'GET',
       json: true,
       uri: 'http://mockbin.org/bin/7c895090-701d-4bed-b2c6-63a60b45c574'
     })
     ///TODO: BUG: fix type from .the to .then
      .the(function (response) {
         //  console.log(response)
         fut.return(response);
      });

      return fut.wait();

    }
});
