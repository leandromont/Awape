angular.module('starter.controllers')

// ==================== Controller Product detail ==================================
.controller('ProductDetailCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $ionicScrollDelegate) {




// ******************************************** ENTER ON VIEW *********************************************************************

  $scope.$on('$ionicView.enter', function(){

    // pegar ID do produto 
    $scope.productId = Auth.get.productId();
    
    // scroll to top on enter
    $ionicScrollDelegate.scrollTop();

    // esperar para carregar os dados
    setTimeout(function(){ 
      var totalAgua;
      // animação das gotas de água
      $('.aguaIndividual').each(function(){
        var qntdAgua = $('#porcentagemAgua', this).text();
        if (qntdAgua > 0){
          var iconHeight = $('.icon', this).outerHeight();
          var bgHeight = iconHeight * (qntdAgua/100);
          $('.bgIcon', this).animate({'height': bgHeight},700,'swing');
        }
        totalAgua =+ qntdAgua;
      });

      if(totalAgua > 0){
        $('.tiposAgua').show();
      }
      
    }, 300);

  });


// ******************************************** VIEW LOADED *********************************************************************

  $scope.$on('$ionicView.loaded', function(){

      firebase.auth().onAuthStateChanged(function(user) {
            if (user) {

              // buscar ID do usuário
              $scope.userId = Auth.get.user.id();

              // buscar itens da lista
              Auth.get.listItens().then(function(resposta) {
                $scope.$apply(function() {
                  $scope.listItens = resposta;
                });

              });

            } else {
              // No user is signed in.
              $location.path("/login");
            }
      });

  // ============== Pegar imagem do produto =========================

    $scope.getProductImage = function(productId){

        var result = $.grep($scope.listItens || [], function(e){ 
          return e.id == productId  ; 
        });

        var retorno='';
        if (result.length == 0) {
          retorno = '';
        } else if (result.length > 0) {

          var image = result[0].imagem;

          retorno = image;
        }
        
        return retorno;
    }
  
    // ============== Pegar nome do produto =========================

    $scope.getProductName = function(productId){

        var result = $.grep($scope.listItens || [], function(e){ 
          return e.id == productId  ; 
        });

        var retorno='';
        if (result.length == 0) {
          retorno = '';
        } else if (result.length > 0) {

          var nome = result[0].produto;

          retorno = nome;
        }
        
        return retorno;
    }

    // ============== Pegar pegada hídrica =========================

    $scope.getProductFootprint = function(productId){

        var result = $.grep($scope.listItens || [], function(e){ 
          return e.id == productId  ; 
        });

        var retorno='';
        if (result.length == 0) {
          retorno = '';
        } else if (result.length > 0) {

          var pegada = result[0].pegada;

          retorno = pegada;
        }
        
        return retorno;
    }

    // ============== Pegar Água azul =========================

    $scope.getBlueWater = function(productId){

        var result = $.grep($scope.listItens || [], function(e){ 
          return e.id == productId  ; 
        });

        var retorno='';
        if (result.length == 0) {
          retorno = '';
        } else if (result.length > 0) {

          var blueWater = result[0].aguaAzul;

          retorno = blueWater;
        }
        
        return retorno;
    }

    // ============== Pegar Água verde =========================

    $scope.getGreenWater = function(productId){

        var result = $.grep($scope.listItens || [], function(e){ 
          return e.id == productId  ; 
        });

        var retorno='';
        if (result.length == 0) {
          retorno = '';
        } else if (result.length > 0) {

          var greenWater = result[0].aguaVerde;

          retorno = greenWater;
        }
        
        return retorno;
    }

    // ============== Pegar Água cinza =========================

    $scope.getGreyWater = function(productId){

        var result = $.grep($scope.listItens || [], function(e){ 
          return e.id == productId  ; 
        });

        var retorno='';
        if (result.length == 0) {
          retorno = '';
        } else if (result.length > 0) {

          var greyWater = result[0].aguaCinza;

          retorno = greyWater;
        }


        
        return retorno;
    }

      // aparecer e desaparecer as informações dos tipos de água
        $('#aguaAzul').click(function(){
          $('#infoVerde').stop(false,true).hide(120);
          $('#infoCinza').stop(false,true).hide(120);
          $('#infoAzul').stop(false,true).toggle(120);
        });
        $('#aguaVerde').click(function(){
          $('#infoAzul').stop(false,true).hide(120);
          $('#infoCinza').stop(false,true).hide(120);
          $('#infoVerde').stop(false,true).toggle(120);
        });
        $('#aguaCinza').click(function(){
          $('#infoAzul').stop(false,true).hide(120);
          $('#infoVerde').stop(false,true).hide(120);
          $('#infoCinza').stop(false,true).toggle(120);
        });
        //



        // aparecer e desaparecer a troca de produto
        $('.produtoRecom').click(function(){
          $('.trocaProdutoWrapper').stop(false,true).show(50);
        });
         $('.trocaProduto .botao').click(function(){
          $('.trocaProdutoWrapper').stop(false,true).hide(50);
        });

    });
  //

  
// ******************************************** LEAVE VIEW *********************************************************************
  $scope.$on('$ionicView.leave', function(){

    // voltar a altura para 0 para fazer a animação toda vez que entrar
    $('.bgIcon').animate({'height': 0},10);
    //

    $('.tiposAgua').hide();

    //tirar a imagem do produto ao sair da página
    $('.produtoPage .fotoWrapper .fotoProduto').css("background-image", "");
    //
    
  });

  
})