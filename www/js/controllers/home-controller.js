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

            var firstName = nomeUsuario.split(" ");

            $scope.getName = firstName[0];
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

        // buscar itens da lista
        Auth.get.listItens().then(function(resposta) {
          $scope.$apply(function() {
            $scope.listItens = resposta;

            // buscar minha Lista
            Auth.get.user.list($scope.userId).then(function(data) {
              $scope.$apply(function() {

                var array = $.map(data, function(value, index) {
                  return [value];
                });

                // Sort by last additions
                $scope.userList = array.reverse();

                var haveRecomendationsOld = _.uniq($scope.userList, function(p){ return p.idProduto; });

                var haveRecomendations = $.grep(haveRecomendationsOld, function(e){ 
                     return e.checked != true; 
                });

                $scope.userListTips = haveRecomendations;

                 if($scope.userListTips.length == 0){
                    $('.withoutTips').show();
                    $('.loader-app').hide();
                 }

                // sort by great number
                // $scope.userList = array;

                // var haveRecomendationsOld = _.uniq($scope.userList, function(p){ return p.idProduto; });

                // var haveRecomendations = $.grep(haveRecomendationsOld, function(e){ 
                //      return e.checked != true; 
                // });

                // var sorted = [];
                // var notSorted = [];


                // for (i = 0; i < haveRecomendations.length; i++){

                //   var result = $.grep($scope.listItens || [], function(e){ 
                //     return e.id == haveRecomendations[i].idProduto; 
                //   });

                //   var retorno='';
                //   if (result.length == 0) {
                //     retorno = '';
                //   } else if (result.length > 0) {

                //     var conteudo = result[0].conteudo;
                //     var pegada = result[0].pegada;
                //     var totalGasto = conteudo * pegada;
                //     var totalZerado = totalGasto.toFixed(0);
                //     var totalNumeroZerado = parseInt(totalZerado);       

                //     retorno = totalNumeroZerado ;
                //   }

                //   var newObject = {
                //     "checked": haveRecomendations[i].checked,
                //     "data": haveRecomendations[i].data,
                //     "idProduto": haveRecomendations[i].idProduto,
                //     "index": haveRecomendations[i].index,
                //     "quantidade": haveRecomendations[i].quantidade,
                //     "pegada": retorno
                //   }

                //   notSorted.push(newObject);

                // }

                // sorted = notSorted.sort(function(a, b) {
                //     return a.pegada - b.pegada;
                // });

                // var reverseSorted = sorted;

                // var go = reverseSorted.reverse();

                // $scope.userListTips = go;

              });
            });
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
        $state.go('login');
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

// ======================= Check if has recomendation =======================================

$scope.recomendationsLength = function(productId){

    var result = $.grep($scope.listItens || [], function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';
    if (result.length == 0) {
      retorno = '';
    } else if (result.length > 0) {

      var recomendations;

      if(result[0].tags){
          recomendations = result[0].tags.length;
      }

      if (recomendations > 0){

        retorno = true;

      } else {

        retorno = false;

      }

      
    }
    
    return retorno;
}

// ======================= get product name =======================================

$scope.productName = function(productId){

    var result = $.grep($scope.listItens || [], function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';
    if (result.length == 0) {
      retorno = '';
    } else if (result.length > 0) {
      retorno = result[0].produto;
    }

    return retorno;
}

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

$scope.getProductRecomentation = function(productId){

    
      var result = $.grep($scope.listItens || [], function(e){ 
        return e.id == productId  ; 
      });

      var retorno='';
      if (result.length == 0) {

        retorno = '';

      } else if (result.length > 0) {

        var recomendations = result[0].tags;

        if(recomendations){
            recomendations = result[0].tags[0];
        }

        retorno = recomendations;
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

// ============== Calcular Diferença entre itens =========================
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

      var diff = (pegadaProduto - pegadaRecomendacao)*12;
      zeraNumero(diff);

        return pegadaEsquema;
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
        retorno = "unidade trocada";
        break
      case "kg":
        retorno = "quilo trocado";
        break
      case "lt":
        retorno = "litro trocado";
        break
        
      default:
        retorno = unidade;
    };

      
    }
    
    return retorno;
}

 // ============== abrir box de troca =========================

$scope.changeProductBox = function(oldItem,thisIndex,itemClicado){

    $scope.oldItem = oldItem;

    $scope.itemClicado = itemClicado;

    $scope.thisIndex = thisIndex;

    $('.trocaProdutoWrapper').stop(false,true).show(50);

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
        firebase.database().ref('/users/' + $scope.userId + '/minhaLista/id'+ $scope.thisIndex).remove().then(function(){

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

// =========== fechar box de troca ========================
$('.trocaProduto .botao').click(function(){
  $('.trocaProdutoWrapper').stop(false,true).hide(50);
});

// ================ Slide das dicas =============

var closedTips;
var openedTips = 0;

$('.tips-show-button').click(function(){

  $('.tips-show-button .icon').toggleClass("ion-ios-arrow-up ion-ios-arrow-down");

  // $('.tips-container').toggleClass("opened");

  if ($("#Slider").hasClass("slideup")){
      $("#Slider").css("max-height",closedTips + "px");
      $("#Slider").removeClass("slideup").addClass("slidedown");
  } else {
      $("#Slider").css("max-height",openedTips + "px");
      $("#Slider").removeClass("slidedown").addClass("slideup");
  }
  

});

// ******************************************** ENTER VIEW ********************************************************************
$scope.$on('onRepeatLastHome', function(){ 


   $('.loader-app').hide();

    if($('.tips-container').children(':visible').length == 0) {
       $('.withoutTips').show();
    }

    if($('.tips-container').children(':visible').length > 1) {
       $('.tips-show-button').show();
    }



    // esconder outras dicas
    closedTips = $('.dicasWrapper.box:visible').outerHeight(true);

    $('.tips-container').css("max-height",closedTips + "px");

    $('.dicasWrapper.box:visible').each(function(){
        openedTips += $(this).outerHeight(true);
    });


});

// ******************************************** ENTER VIEW ********************************************************************
$scope.$on('$ionicView.enter', function(){

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

// ******************************************** LEAVE VIEW ********************************************************************
$scope.$on('$ionicView.leave', function(){
  
});

})

// ==================== When repeat ends =========================
.directive('onLastRepeatHome', function() {
    return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function(){
            scope.$emit('onRepeatLastHome', element, attrs);
        }, 1);
    };
})
