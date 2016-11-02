angular.module('starter.controllers')

.controller('HomeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {



// ******************************************** GET DATA ********************************************************************
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        // buscar ID do usuário
        $scope.userId = Auth.get.user.id();

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

        // buscar Minha pegada hídrica
        Auth.get.user.waterFootprint($scope.userId).then(function(data) {
          $scope.$apply(function() {
            
            $scope.userWaterFootprint = data;

            // calcular o total da minha pegada hídrica
            $scope.getWaterFootprintTotal = function(){

              var multips = [4400, 7000, 7000, 44000, 8000, 11000, 525, 84000, 404000, 52000, 540, 13000, 34000, 20000, 41000, 9000];

              var userWF = $scope.userWaterFootprint;



              // total higiene
              var totalHigiene = userWF.banho*multips[0] + userWF.dentes*multips[1];

              // total de limpeza
              var totalLimpeza = userWF.roupa*multips[2] + userWF.louca*multips[3] + userWF.carro*multips[4] + userWF.jardim*multips[5] + userWF.calcada*multips[6];

              // total de alimento
              var totalAlimento = userWF.cereal*multips[7] + userWF.carne*multips[8] + userWF.laticineos*multips[9] + userWF.ovos*multips[10] + userWF.vegetais*multips[11] + userWF.frutas*multips[12] + userWF.raizes*multips[13] + userWF.cafe*multips[14] + userWF.cha*multips[15];

              // Total geral 
              var totalPegadaPessoal = totalHigiene + totalAlimento + totalAlimento;


              return totalPegadaPessoal;


            };
            
          });
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



// ******************************************** ENTER VIEW ********************************************************************
$scope.$on('$ionicView.enter', function(){

  // buscar itens da lista
  Auth.get.listItens().then(function(resposta) {
    $scope.$apply(function() {
      $scope.listItens = resposta;
    });

  });

  $scope.getListTotal = function(){

      retorno = $scope.listTotal;

      $scope.listTotal = 0;
      
      return retorno;
  }
       
});

// ******************************************** LOADED VIEW ********************************************************************
$scope.$on('$ionicView.loaded', function(){

});

// ******************************************** LEAVE VIEW ********************************************************************
$scope.$on('$ionicView.leave', function(){
  
});

})
