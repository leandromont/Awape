angular.module('starter.controllers')

// ==================== Controller Consumo (Pegada Hídrica Pessoal) ==================================
.controller('ConsumoCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $ionicSlideBoxDelegate,$ionicScrollDelegate) {




  $scope.$on('$ionicView.enter', function(){

    // evitar inserir texto no input
    $('.resposta').keypress(function(event) {
      console.log("teste");
      if(event.which < 44
      || event.which > 59) {
          event.preventDefault();
      } // prevent if not number/dot

      if(event.which == 44
      && $(this).val().indexOf(',') != -1) {
          event.preventDefault();
      } // prevent if already dot
    });
    //

    var banhoVal = 0;
    var denteVal = 0;
    var roupaVal = 0;
    var loucaVal = 0;
    var carroVal = 0;
    var jardimVal = 0;
    var calcadaVal = 0;
    var cerealVal = 0;
    var carneVal = 0;
    var laticineoVal = 0;
    var ovoVal = 0;
    var vegetaisVal = 0;
    var frutaVal = 0;
    var raizVal = 0;
    var cafeVal = 0;
    var chaVal = 0;
    var banhoTotal = 0;
    var denteTotal = 0;
    var roupaTotal = 0;
    var loucaTotal = 0;
    var carroTotal = 0;
    var jardimTotal = 0;
    var calcadaTotal = 0;
    var cerealTotal = 0;
    var carneTotal = 0;
    var laticineoTotal = 0;
    var ovoTotal = 0;
    var vegetaisTotal = 0;
    var frutaTotal = 0;
    var raizTotal = 0;
    var cafeTotal = 0;
    var chaTotal = 0;

    // conta e exibição do total a partir dos inputs do usuário
    var multips = [4400, 7000, 7000, 44000, 8000, 11000, 525, 84000, 404000, 52000, 540, 13000, 34000, 20000, 41000, 9000];

      // onchange get id and value from input
      $('input').change(function(){
        var inputUser = $(this).val();
        var idElem = $(this).attr('id');

        //check the id and than add the results
        switch (idElem) {
          // higiene
          case "banho":
            banhoVal = inputUser;
            banhoTotal = banhoVal*multips[0];
            $(this).next('.resultadoItem').show().find('span').text(banhoTotal);
            break
          case "dente":
            denteVal = inputUser;
            denteTotal = denteVal*multips[1];
            $(this).next('.resultadoItem').show().find('span').text(denteTotal);
            break
          // limpeza
          case "roupa":
            roupaVal = inputUser;
            roupaTotal = roupaVal*multips[2];
            $(this).next('.resultadoItem').show().find('span').text(roupaTotal);
            break
          case "louca":
            loucaVal = inputUser;
            loucaTotal = loucaVal*multips[3];
            $(this).next('.resultadoItem').show().find('span').text(loucaTotal);
            break
          case "carro":
            carroVal = inputUser;
            carroTotal = carroVal*multips[4];
            $(this).next('.resultadoItem').show().find('span').text(carroTotal);
            break
          case "jardim":
            jardimVal = inputUser;
            jardimTotal = jardimVal*multips[5];
            $(this).next('.resultadoItem').show().find('span').text(jardimTotal);
            break
          case "calcada":
            calcadaVal = inputUser;
            calcadaTotal = calcadaVal*multips[6];
            $(this).next('.resultadoItem').show().find('span').text(calcadaTotal);
            break
          // alimentos
          case "cereal":
            cerealVal = inputUser.toString().replace(/\,/g, '.');
            cerealTotal = cerealVal*multips[7];
            $(this).next('.resultadoItem').show().find('span').text(cerealTotal);
            break
          case "carne":
            carneVal = inputUser.toString().replace(/\,/g, '.');
            carneTotal = carneVal*multips[8];
            $(this).next('.resultadoItem').show().find('span').text(carneTotal);
            break
          case "laticineo":
            laticineoVal = inputUser.toString().replace(/\,/g, '.');
            laticineoTotal = laticineoVal*multips[9];
            $(this).next('.resultadoItem').show().find('span').text(laticineoTotal);
            break
          case "ovo":
            ovoVal = inputUser;
            ovoTotal = ovoVal*multips[10];
            $(this).next('.resultadoItem').show().find('span').text(ovoTotal);
            break
          case "vegetais":
            vegetaisVal = inputUser.toString().replace(/\,/g, '.');
            vegetaisTotal = vegetaisVal*multips[11];
            $(this).next('.resultadoItem').show().find('span').text(vegetaisTotal);
            break
          case "fruta":
            frutaVal = inputUser.toString().replace(/\,/g, '.');
            frutaTotal = frutaVal*multips[12];
            $(this).next('.resultadoItem').show().find('span').text(frutaTotal);
            break
          case "raiz":
            raizVal = inputUser.toString().replace(/\,/g, '.');
            raizTotal = raizVal*multips[13];
            $(this).next('.resultadoItem').show().find('span').text(raizTotal);
            break
          case "cafe":
            cafeVal = inputUser;
            cafeTotal = cafeVal*multips[14];
            $(this).next('.resultadoItem').show().find('span').text(cafeTotal);
            break
          case "cha":
            chaVal = inputUser;
            chaTotal = chaVal*multips[15];
            $(this).next('.resultadoItem').show().find('span').text(chaTotal);
            break
          default:
            console.log("fudeu");
        };

        // add totals and than show them
        var totalHigiene = banhoTotal+denteTotal;
        var totalLimpeza = roupaTotal+loucaTotal+carroTotal+jardimTotal+calcadaTotal;
        var totalAlimento = cerealTotal+carneTotal+laticineoTotal+ovoTotal+vegetaisTotal+frutaTotal+raizTotal+cafeTotal+chaTotal;
        var totalPegadaPessoal = totalHigiene + totalAlimento + totalAlimento;
        $('.resultadoCategoria#totalHigiene').show().find('span').text(totalHigiene);
        $('.resultadoCategoria#totalLimpeza').show().find('span').text(totalLimpeza);
        $('.resultadoCategoria#totalAlimento').show().find('span').text(totalAlimento);
        $('.resultadoTotal').find('span').text(totalPegadaPessoal);
      });


    });

    // scroll to top every time it changes the slide
    $scope.slideChanged = function(index) {
      $ionicScrollDelegate.scrollTop();
      $scope.slideIndex = index;
    };
    //

    $scope.slideIndex = 0;
    
    // disable swipe to change slide-box
    $scope.disableSwipe = function() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    //

    // next slide-box + slide-box height
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
      var slider = $('.minhaPegada .slider');
      var actualSlide;
      var actualSlideHeight;
      if (slider.hasClass('slide-0')){
        actualSlideHeight = $('.minhaPegada .slidebox1').find('.pageWrapper').outerHeight()+115;
        slider.height(actualSlideHeight);
      } else if (slider.hasClass('slide-1')){
        actualSlideHeight = $('.minhaPegada .slidebox2').find('.pageWrapper').outerHeight()+115;
        slider.height(actualSlideHeight);
      } else {
      }
    };
    //

    // previous slide-box + slide-box height
    $scope.prevSlide = function() {
      $ionicSlideBoxDelegate.previous();
      var slider = $('.minhaPegada .slider');
      var actualSlide;
      if (slider.hasClass('slide-0')){
      } else if (slider.hasClass('slide-1')){
        actualSlideHeight = $('.minhaPegada .slidebox0').find('.pageWrapper').outerHeight()+115;
        slider.height(actualSlideHeight);
      } else {
          actualSlideHeight = $('.minhaPegada .slidebox1').find('.pageWrapper').outerHeight()+115;
        slider.height(actualSlideHeight);
      }
    };
    //

    // finish slide-box --- SUBMIT ALL FORMS
    // mostrar o total da pegada hídrica e redirecionar para a home
    $scope.submitAll = function() {

      console.log("submit");
      $('.resultadoTotalWrapper').show(150).delay(2500).queue(function() {
           $state.go('tab.home');
        });
      
    };
    //

  $scope.$on('$ionicView.leave', function(){

    // voltar a altura para 0 para fazer a animação toda vez que entrar
    $('.resultadoTotalWrapper').hide();
    //

  });

})