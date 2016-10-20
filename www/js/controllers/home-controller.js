angular.module('starter.controllers')

// ==================== Controller Home ==================================
.controller('HomeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.loaded', function(){
      
  });

  $scope.$on('$ionicView.enter', function(){
     
      

      setTimeout(function(){

        // buscar ID do usuário
        $scope.userId = Auth.get.user.id();

        // $scope.sendName = Auth.send.user.name($scope.userId,'Seygi');

        // buscar nome do usuário
        Auth.get.user.name($scope.userId).then(function(nomeUsuario) {
          $scope.getName = nomeUsuario;
        });

        // buscar minha Lista
        Auth.get.user.list($scope.userId).then(function(data) {
          $scope.userList = data;
        });

        // buscar itens da lista
        Auth.get.listItens().then(function(resposta) {
          $scope.listItens = resposta;
        });
        
      }, 500);

  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})
