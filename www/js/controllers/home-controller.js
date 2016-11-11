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

        // buscar imagem do usuário
        Auth.get.user.image($scope.userId).then(function(imagemUsuario) {
          $scope.$apply(function() {




            if(imagemUsuario){
              $scope.getImage = imagemUsuario;
            } else {
              $scope.getImage = 'img/usuario.png';
              $('.saudacao .fotoWrapper').addClass('usuarioPadrao');
              $('.saudacao .fotoWrapper .fotoUsuario').addClass('usuarioPadrao');
            }
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
              var totalPegadaPessoal = totalHigiene + totalLimpeza + totalAlimento;



              // arrumar leitura dos números
              var pegadaZerado = totalPegadaPessoal.toFixed(0);
              var pegadaLength = pegadaZerado.length;
              // milhoes
              if(pegadaLength > 6){
                var pegadaMilhao = pegadaZerado.substring(0, pegadaLength-6);
                var pegadaMil = pegadaZerado.substring(pegadaMilhao.length, pegadaLength-5);
                if (pegadaMil === "0"){
                  var pegadaEsquema = pegadaMilhao;
                } else {
                  var pegadaEsquema = pegadaMilhao + "," + pegadaMil;
                }
                if (pegadaMilhao > 1){
                  $('#totalPHP .valor span').html("<span id='numero'>"+pegadaEsquema+"</span> milhões de litros");
                } else {
                  $('#totalPHP .valor span').html("<span id='numero'>"+pegadaEsquema+"</span> milhão de litros");
                }

              // mil
              } else if(pegadaLength > 3){
                var pegadaMil = pegadaZerado.substring(0, pegadaLength-3);
                var pegadaCem = pegadaZerado.substring(pegadaMil.length, pegadaLength-2);

                if (pegadaCem === "0"){
                  var pegadaEsquema = pegadaMil;
                } else {
                  var pegadaEsquema = pegadaMil + "," + pegadaCem;
                }
                $('#totalPHP .valor span').html("<span id='numero'>"+pegadaEsquema+"</span> mil litros");

              // cem
              } else {
                var pegadaEsquema = pegadaZerado;
                $('#totalPHP .valor span').html("<span id='numero'>"+pegadaEsquema+"</span> litros");
              }
              //
              
              // relacao da sua pegada com a media nacional
              var pegadaNumeroZerado = parseInt(pegadaZerado);
              var mediaNacional = 2027000;
              var mediaPorcent = ((pegadaNumeroZerado*100) / mediaNacional) - 100;
              var mediaPorcentFixed = mediaPorcent.toFixed(0);
              var lengthMedia = mediaPorcentFixed.length;
              if (mediaPorcentFixed < 0){
                var mediaNegativa = mediaPorcentFixed.substring(1, lengthMedia);
                $('#totalPHP .diferenca span#porcent').text(mediaNegativa);
                $('#totalPHP .diferenca span#bomOuRuim').text('abaixo');
                $('#totalPHP .diferenca').css({'color': '#40ce8d', 'opacity': '1'});
              } else {
                $('#totalPHP .diferenca span#porcent').text(mediaPorcentFixed);
                $('#totalPHP .diferenca span#bomOuRuim').text('acima');
                $('#totalPHP .diferenca').css({'color': '#f35858', 'opacity': '1'});
              }
              //
              return pegadaNumeroZerado;


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
      var totalGasto = quantidade * conteudo * pegada;
      var totalZerado = totalGasto.toFixed(0);
      var totalNumeroZerado = parseInt(totalZerado);

      retorno = totalNumeroZerado;

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
    
    if($scope.listTotal != null || $scope.listTotal != undefined){
      // arrumar leitura dos números
      var textoTotal = $scope.listTotal.toString();
      var totalLength = textoTotal.length;
      // milhoes
      if(totalLength > 6){
        var totalMilhao = textoTotal.substring(0, totalLength-6);
        var totalMil = textoTotal.substring(totalMilhao.length, totalLength-5);
        if (totalMil === "0"){
          var totalEsquema = totalMilhao;
        } else {
          var totalEsquema = totalMilhao + "," + totalMil;
        }
        if (totalMilhao > 1){
          var totalAparecer = totalEsquema+" milhões de litros";
        } else {
          var totalAparecer = totalEsquema+" milhão de litros";
        }

      // mil
      } else if(totalLength > 3){
        var totalMil = textoTotal.substring(0, totalLength-3);
        var totalCem = textoTotal.substring(totalMil.length, totalLength-2);

        if (totalCem === "0"){
          var totalEsquema = totalMil;
        } else {
          var totalEsquema = totalMil + "," + totalCem;
        }
        var totalAparecer = totalEsquema+" mil litros";

      // cem
      } else if($scope.listTotal === null || $scope.listTotal === undefined) {
        console.log('0litros');

      } else{
        var totalEsquema = textoTotal;
        var totalAparecer = totalEsquema+" litros";
      }
      //

      retorno = totalAparecer;

      $scope.listTotal = 0;
      
      return retorno;
  } else {
  $('#totalLista .dados .valor span').text('0 litros');
  }
}
});

// ******************************************** LOADED VIEW ********************************************************************
$scope.$on('$ionicView.loaded', function(){


});

// ******************************************** LEAVE VIEW ********************************************************************
$scope.$on('$ionicView.leave', function(){
  
});

})
