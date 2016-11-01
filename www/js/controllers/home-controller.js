angular.module('starter.controllers')

.controller('HomeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {



// ******************************************** GET DATA ********************************************************************
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

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
          $scope.$apply(function() {
            $scope.userList = data;
          });
        });

        // buscar itens da lista
        Auth.get.listItens().then(function(resposta) {
          $scope.$apply(function() {
            $scope.listItens = resposta;
          });

          // alert("carregou");
        });

      } else {
        // No user is signed in.
        $location.path("/login");
      }
  });


// ======================= get waterFootprint =======================================

$scope.waterFootprint = function(productId,quantidade,checked){

    var result = $.grep($scope.listItens || [], function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';

    

    if (result.length == 0) {
      retorno = 'nao achei';
    } else if (result.length > 0) {

      var conteudo = result[0].conteudo;
      var pegada = result[0].pegada;


      retorno = quantidade * conteudo * pegada;

      if(checked){
        
        $scope.listTotal += retorno;

      }


    }
    
    return retorno;
}

// ======================= get waterFootprint Total =======================================

$scope.getListTotal = function(){

    retorno = $scope.listTotal;

    $scope.listTotal = 0;
    
    return retorno;
}

// ******************************************** ENTER VIEW ********************************************************************
$scope.$on('$ionicView.enter', function(){
       
});

// ******************************************** LOADED VIEW ********************************************************************
$scope.$on('$ionicView.loaded', function(){

});

// ******************************************** LEAVE VIEW ********************************************************************
$scope.$on('$ionicView.leave', function(){
  
});

})
