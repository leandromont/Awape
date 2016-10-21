angular.module('starter.controllers')

// ==================== Controller Product detail ==================================
.controller('ProductDetailCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $ionicScrollDelegate) {


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
  //

  $scope.$on('$ionicView.enter', function(){

    console.log($scope.productDetailId)

    // scroll to top on enter
    $ionicScrollDelegate.scrollTop();
    //

    // pegar a porcentagem de cada tipo de água e encher a gota com esse valor
    $('.aguaIndividual').each(function(){
      var qntdAgua = $('#porcentagemAgua', this).text();
      var iconHeight = $('.icon', this).outerHeight();
      var bgHeight = iconHeight * (qntdAgua/100);
      $('.bgIcon', this).animate({'height': bgHeight},700,'swing');
    });
    //


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

  });

  $scope.$on('$ionicView.leave', function(){

    // voltar a altura para 0 para fazer a animação toda vez que entrar
    $('.bgIcon').animate({'height': 0},10);
    //

  });

  
})