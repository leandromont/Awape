angular.module('starter.controllers')

// ==================== Controller Product detail ==================================
.controller('ProductDetailCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $ionicScrollDelegate) {




// ******************************************** ENTER ON VIEW *********************************************************************

  $scope.$on('$ionicView.enter', function(){



    // pegar ID do produto 
    $scope.productId = Auth.get.productId();

    // pegar Index do produto 
    $scope.productIndex = Auth.get.productIndex();


      // buscar itens da lista
      Auth.get.listItens().then(function(resposta) {
        $scope.$apply(function() {
          $scope.listItens = resposta;

          

            // get recomendations
            $scope.getProductRecomentations($scope.productId);
        });

      });
      


    
    
    // scroll to top on enter
    $ionicScrollDelegate.scrollTop();


  });


// ******************************************** VIEW LOADED *********************************************************************

  $scope.$on('$ionicView.loaded', function(){

      firebase.auth().onAuthStateChanged(function(user) {
            if (user) {

              // buscar ID do usuário
              $scope.userId = Auth.get.user.id();


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

     // ============== Pegar recomendações do produto =========================

    $scope.getProductRecomentations = function(productId){



        var result = $.grep($scope.listItens || [], function(e){ 
          return e.id == productId  ; 
        });

        var retorno='';
        if (result.length == 0) {

          retorno = '';
          $('.loader-app').hide();

        } else if (result.length > 0) {



          var recomendations = result[0].tags;

          $scope.productRecomentations = recomendations;

          retorno = recomendations;

          $('.loader-app').hide();
        }
        
        return retorno;
    }

     // ============== calcular as diferenças entre recomendação e produto =========================

    $scope.calcDifference = function(pegadaProduto,pegadaRecomendacao){

      function zeraNumero (numeroBruto){
      // arrumar leitura dos números
      var pegadaZerado = numeroBruto.toFixed(0);
      var pegadaLength = pegadaZerado.length;
      // milhoes
      if(pegadaLength > 6){
        var pegadaMilhao = pegadaZerado.substring(0, pegadaLength-6);
        var pegadaMil = pegadaZerado.substring(pegadaMilhao.length, pegadaLength-5);
        if (pegadaMil === "0"){
          pegadaEsquema = pegadaMilhao;
        } else {
          pegadaEsquema = pegadaMilhao + "," + pegadaMil;
        }
        if (pegadaMilhao > 1){
          pegadaEsquema = pegadaEsquema+' milhões de';
        } else {
          pegadaEsquema = pegadaEsquema+' milhão de';
        }

      // mil
      } else if(pegadaLength > 3){
        var pegadaMil = pegadaZerado.substring(0, pegadaLength-3);
        var pegadaCem = pegadaZerado.substring(pegadaMil.length, pegadaLength-2);

        if (pegadaCem === "0"){
          pegadaEsquema = pegadaMil;
        } else {
          pegadaEsquema = pegadaMil + "," + pegadaCem;
        }
        pegadaEsquema = pegadaEsquema+' mil';

      // cem
      } else {
        pegadaEsquema = pegadaZerado;
      }
      //
    };

      var diff = pegadaProduto - pegadaRecomendacao;
      zeraNumero(diff);

      $('.loader-app').hide();

        return pegadaEsquema;
    }

    // ============== abrir box de troca =========================

    $scope.changeProductBox = function(itemClicado){

        $('.trocaProdutoWrapper').stop(false,true).show(50);

        $scope.itemClicado = itemClicado;

    }

    // ============== Pegar nome do produto =========================

    $scope.getNewName = function(){

        var result = $.grep($scope.listItens || [], function(e){ 
          return e.id == $scope.itemClicado  ; 
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

    // ============== trocar item =========================

    $scope.changeProduct = function(){

        var newItemIndex = moment().valueOf();

      
        firebase.database().ref('/users/' + $scope.userId + '/minhaLista/id' + newItemIndex)
        .update({
          "checked" : false,
          "data" : "01/01/01",
          "idProduto" : $scope.itemClicado,
          "quantidade" : 1,
          "index": newItemIndex
        }).then(function(){
            firebase.database().ref('/users/' + $scope.userId + '/minhaLista/id'+ $scope.productIndex).remove().then(function(){

                $('.adicionaProdutoConfirmation').removeClass('zoomOut').addClass('animatedFast zoomIn').css({'opacity': '1', 'display': 'block'}).delay(1500).queue(function(){
                  $('.adicionaProdutoConfirmation').removeClass('zoomIn').addClass('zoomOut');
                  $(this).dequeue().delay(350).queue(function(){
                    $('.adicionaProdutoConfirmation').css({'opacity': '0', 'display': 'none'});
                    $state.go('tab.list');
                    $(this).dequeue();
                  });
                });

            });
        });

        // buscar minha Lista
        Auth.get.user.list($scope.userId).then(function(data) {
          $scope.$apply(function() {
            var array = $.map(data, function(value, index) {
                return [value];
            });

            $scope.userList = array.reverse();
          });
        });

       

    }

     // ============== Pegar unidade do produto =========================

    $scope.getProductUnity = function(productId){

        var result = $.grep($scope.listItens || [], function(e){ 
          return e.id == productId  ; 
        });

        var retorno='';
        if (result.length == 0) {
          retorno = '';
        } else if (result.length > 0) {

          var unidade = result[0].unidade;

          switch (unidade){
          case "un":
            retorno = "unidade";
            break
          case "kg":
            retorno = "quilo";
            break
          case "lt":
            retorno = "litro";
            break
            
          default:
            retorno = unidade;
        };

          
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

          var conteudo = result[0].conteudo;
          var pegada = result[0].pegada;
          var totalGasto = conteudo * pegada;
          var totalZerado = totalGasto.toFixed(0);
          var totalNumeroZerado = parseInt(totalZerado);

          var pegada = totalNumeroZerado;
          // arrumar leitura dos números
          var textoTotal = pegada.toString();
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
              var totalAparecer = totalEsquema+" milhões de lts";
            } else {
              var totalAparecer = totalEsquema+" milhão de lts";
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
            var totalAparecer = totalEsquema+" mil lts";

          // cem
          } else {
            var totalEsquema = textoTotal;
            var totalAparecer = totalEsquema+" lts";
          }
          //

          retorno = totalAparecer ; // <----- inserir totalAparecer aqui
        }
        
        return retorno;
    }

     // ============== Pegar valor de pegada hídrica =========================

    $scope.getProductFootprintNumber = function(productId){

        var result = $.grep($scope.listItens || [], function(e){ 
          return e.id == productId  ; 
        });

        var retorno='';
        if (result.length == 0) {
          retorno = '';
        } else if (result.length > 0) {

          var conteudo = result[0].conteudo;
          var pegada = result[0].pegada;
          var totalGasto = conteudo * pegada;
          var totalZerado = totalGasto.toFixed(0);
          var totalNumeroZerado = parseInt(totalZerado);

          var pegada = totalNumeroZerado;        

          retorno = pegada ;
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


        // pegar águas
       var totalAgua;
        // animação das gotas de água
        $('.aguaIndividual').each(function(){
          var qntdAgua = $('#porcentagemAgua', this).text();
          if (qntdAgua > 0){
            $('.tiposAgua').show();
            var iconHeight = $('.icon', this).outerHeight() - 6;
            var bgHeight = iconHeight * (qntdAgua/100);
            $('.bgIcon', this).animate({'height': bgHeight},700,'swing');
          }
          totalAgua =+ qntdAgua;
        });
        
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

        $('.produtoPage').click(function(){
          // $('.infoAgua').hide();
        })

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

  });

  
})