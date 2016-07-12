import { Meteor } from 'meteor/meteor';
var Request = require("request-promise");
import Future from 'fibers/future';


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  workingSetTimeout:function(){

    var fut = new Future();

    Meteor.setTimeout(function(){
       fut.return({ foo: 'Hello Word'});
    }, 500);

    return fut.wait();

  },
  brokenSetTimeout:function(){

    var fut = new Future();

    Meteo.setTimeout(function(){
       fut.return({ foo: 'Hello Word'});
    }, 500);

    return fut.wait();

  },
  correctRequest:function(){

    var fut = new Future();


    Request({
      method: 'GET',
      json:true,
      uri: 'http://mockbin.org/bin/bbe7f656-12d6-4877-9fa8-5cd61f9522a9'
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
       json:true,
       uri: 'http://mockbin.org/bin/bbe7f656-12d6-4877-9fa8-5cd61f9522a9'
     })
     ///TODO: BUG: fix type from .the to .then
      .the(function (response) {
         //  console.log(response)
         fut.return(response);
      });

      return fut.wait();

    }
});
