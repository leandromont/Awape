
'Use Strict';
angular.module('starter').controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup,$firebaseAuth, $firebaseObject,$log, Auth, FURL, Utils) {
  var auth = $firebaseAuth();
  var ref = firebase.database().ref();
  var userkey = "";

  // aparecer a página de login
  $('.loginPage .scroll').slideDown(400).show(800);
  //

  $scope.signIn = function (user) {
    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user)
      .then(function(authData) {
      
      Utils.hide();

      // buscar saber se o usuário já viu o tutorial
      Auth.get.user.tutorial(authData.uid).then(function(tutorialUsuario) {
        
        if(!tutorialUsuario){
          $state.go('tab.list-edit-mode');
        } else {
          $state.go('tab.home');
        }
      });
      

      }, function(err) {
        Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

  $scope.signInAnon = function () {
    $log.log("Enviado");
    Utils.show();
    auth.$signInAnonymously().then(function(firebaseUser) {

     Utils.hide();
     $location.path("/tabs/tab-home.html");
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
    
  };

  $scope.checkUser = function () {
    var firebaseUser = auth.$getAuth();

    if (firebaseUser) {
        $location.path("/tabs/tab-home.html");
    } else {
    $log.log("Signed out");
    $location.path("/login");
    }

  }
  
});

