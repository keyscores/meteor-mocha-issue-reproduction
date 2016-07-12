import { Meteor } from 'meteor/meteor';
import Request from 'request-promise';
import Future from 'fibers/future';

Meteor.methods({
  syncMethod:function(){

    return { foo: 'Hello World'}

  },
  brokenSyncMethod:function(){

    return { foo: 'not what I expected'}

  },
  asyncMethod:function(){

    var fut = new Future();

    //TODO: BUG: replace typo Meteo for Meteor
    Meteor.setTimeout(function(){
       fut.return({ foo: 'Hello World'});
    }, 500);

    return fut.wait();

  },
  brokenAsyncMethod:function(){

    var fut = new Future();

    //TODO: BUG: replace typo Meteo for Meteor
    Meteo.setTimeout(function(){
       fut.return({ foo: 'not what I expected'});
    }, 500);

    return fut.wait();

  }
});
