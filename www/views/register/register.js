'Use Strict';
angular.module('starter').controller('registerController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {

  $scope.register = function(user) {
    if(angular.isDefined(user)){
    Utils.show();
    Auth.register(user)
      .then(function() {
         Utils.hide();
         console.log("Antes de loguear:" + JSON.stringify(user));
         Utils.alertshow("Successfully","The User was Successfully Created.");
         $location.path('/');
      }, function(err) {
         Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

  // $scope.$on('$ionicView.enter', function(){
  //   console.log($location.path());
  // });

    
  // firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {

  //       var starCountRef = firebase.database().ref('users/' + user.uid);

  //       starCountRef.on('value', function(snapshot) {
  //         alert("criou usuário "+ user.uid);
  //       });

  //     } else {

  //     }
  // });

});

function onMyFrameLoad() {
  $('.loader-app').hide();
};
