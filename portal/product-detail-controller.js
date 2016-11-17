function closeDetalhe(){
    $j('.produtoPage').hide();
    $j('.paginaLista').show();

  };

angular.module('starter.controllers')

// ==================== Controller Product detail ==================================
.controller('ProductDetailCtrl', function ($scope, $state, $localStorage, $log, $location,$http, $firebaseObject, $firebaseAuth, Auth, Utils) {


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


   firebase.auth().onAuthStateChanged(function(user) {
          if (user) {

            // buscar ID do usuário
            $scope.userId = Auth.get.user.id();


          } else {
            // No user is signed in.
            // $location.path("/login");
          }
    });
     

  // ============== Pegar imagem do produto =========================

    $scope.getProductImage = function(productId){

        var result = $j.grep($scope.listItens || [], function(e){ 
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

        var result = $j.grep($scope.listItens || [], function(e){ 
          return e.id == productId  ; 
        });

        var retorno='';
        if (result.length == 0) {

          retorno = '';

        } else if (result.length > 0) {

          var recomendations = result[0].tags;

          $scope.productRecomentations = recomendations;

          retorno = recomendations;
        }
        
        return retorno;
    }

     // ============== calcular as diferenças entre recomendação e produto =========================

    $scope.calcDifference = function(pegadaProduto,pegadaRecomendacao){

        return pegadaProduto - pegadaRecomendacao;
    }

    // ============== abrir box de troca =========================

    $scope.changeProductBox = function(itemClicado){

        $j('.trocaProdutoWrapper').stop(false,true).show(50);

        $scope.itemClicado = itemClicado;

    }

    // ============== Pegar nome do produto =========================

    $scope.getNewName = function(){

        var result = $j.grep($scope.listItens || [], function(e){ 
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

                $j('.adicionaProdutoConfirmation').removeClass('zoomOut').addClass('animatedFast zoomIn').css({'opacity': '1', 'display': 'block'}).delay(1500).queue(function(){
                  $j('.adicionaProdutoConfirmation').removeClass('zoomIn').addClass('zoomOut');
                  $j(this).dequeue().delay(350).queue(function(){
                    $j('.adicionaProdutoConfirmation').css({'opacity': '0', 'display': 'none'});
                    $state.go('tab.list');
                    $j(this).dequeue();
                  });
                });

            });
        });

        // buscar minha Lista
        Auth.get.user.list($scope.userId).then(function(data) {
          $scope.$apply(function() {
            $scope.userList = data;
            lista = $scope.userList
          });
        });

       

    }

     // ============== Pegar unidade do produto =========================

    $scope.getProductUnity = function(productId){

        var result = $j.grep($scope.listItens || [], function(e){ 
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
            retorno = "kilo";
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

        var result = $j.grep($scope.listItens || [], function(e){ 
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

        var result = $j.grep($scope.listItens || [], function(e){ 
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

        var result = $j.grep($scope.listItens || [], function(e){ 
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

        var result = $j.grep($scope.listItens || [], function(e){ 
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

        var result = $j.grep($scope.listItens || [], function(e){ 
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

        var result = $j.grep($scope.listItens || [], function(e){ 
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
        $j('.aguaIndividual').each(function(){
          var qntdAgua = $j('#porcentagemAgua', this).text();
          if (qntdAgua > 0){
            $j('.tiposAgua').show();
            var iconHeight = $j('.icon', this).outerHeight();
            var bgHeight = iconHeight * (qntdAgua/100);
            $j('.bgIcon', this).animate({'height': bgHeight},700,'swing');
          }
          totalAgua =+ qntdAgua;
        });

        $j('.loader-app').hide();
        
        return retorno;
    }

      // aparecer e desaparecer as informações dos tipos de água
        $j('#aguaAzul').click(function(){
          $j('#infoVerde').stop(false,true).hide(120);
          $j('#infoCinza').stop(false,true).hide(120);
          $j('#infoAzul').stop(false,true).toggle(120);
        });
        $j('#aguaVerde').click(function(){
          $j('#infoAzul').stop(false,true).hide(120);
          $j('#infoCinza').stop(false,true).hide(120);
          $j('#infoVerde').stop(false,true).toggle(120);
        });
        $j('#aguaCinza').click(function(){
          $j('#infoAzul').stop(false,true).hide(120);
          $j('#infoVerde').stop(false,true).hide(120);
          $j('#infoCinza').stop(false,true).toggle(120);
        });
        //

        $j('.produtoPage').click(function(){
          // $j('.infoAgua').hide();
        })

        // aparecer e desaparecer a troca de produto
        $j('.produtoRecom').click(function(){
          $j('.trocaProdutoWrapper').stop(false,true).show(50);
        });
         $j('.trocaProduto .botao').click(function(){
          $j('.trocaProdutoWrapper').stop(false,true).hide(50);
        });

  
})