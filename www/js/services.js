angular.module('starter.services', ['firebase'])

.factory('userData', function(FURL, $log, $firebaseAuth, $firebaseArray, $firebaseObject, $translate, Utils) {


var ref = firebase.database().ref();
// var auth = $firebaseAuth(ref);
// var auth = $firebaseObject(ref);
var auth = {
	get: $firebaseAuth().$getAuth
};

var user = firebase.auth().currentUser;
// var auth = $firebaseAuth();

var firedata = auth.get


  return {
  	all:firedata
  }

});



