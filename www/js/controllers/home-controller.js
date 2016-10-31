angular.module('starter.controllers')

// ==================== Controller Home ==================================
.controller('HomeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        // User is signed in and currentUser will no longer return null.

         // buscar ID do usuário
        $scope.userId = Auth.get.user.id();

        // $scope.sendName = Auth.send.user.name($scope.userId,'Seygi');

        // buscar nome do usuário
        Auth.get.user.name($scope.userId).then(function(nomeUsuario) {
          $scope.$apply(function() {
            $scope.getName = nomeUsuario;
          });
        });

        // buscar minha Lista
        Auth.get.user.list($scope.userId).then(function(data) {
          $scope.userList = data;
        });

        // buscar itens da lista
        Auth.get.listItens().then(function(resposta) {
          $scope.listItens = resposta;
      });

      } else {
        // No user is signed in.
        $location.path("/login");
      }
  });

  $scope.$on('$ionicView.enter', function(){
         
  });

  $scope.$on('$ionicView.loaded', function(){

  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})
