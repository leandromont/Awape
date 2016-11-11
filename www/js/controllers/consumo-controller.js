angular.module('starter.controllers')

.controller('ConsumoCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $ionicSlideBoxDelegate,$ionicScrollDelegate) {

// ******************************************** GET DATA ********************************************************************

 firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        // buscar ID do usuário
        $scope.userId = Auth.get.user.id();

        // 
        Auth.get.user.waterFootprint($scope.userId).then(function(data) {
          $scope.$apply(function() {
            
            $scope.userWaterFootprint = data;
            
          });
        });



      } else {
        // No user is signed in.
        $location.path("/login");
      }
  });


 // ============================================== Calcular Pegada Hídrica Pessoal ==============================
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


    function calcWaterFootprint(element,value){
        var inputUser = $(element).val();
        var idElem = $(element).attr('id');

        

        //check the id and than add the results
        switch (idElem) {
          // higiene
          case "banho":
            banhoVal = inputUser;
            banhoTotal = banhoVal*multips[0];
            var totalZerado = banhoTotal.toFixed(0);
            var totalBanhoZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalBanhoZerado);
            break
          case "dente":
            denteVal = inputUser;
            denteTotal = denteVal*multips[1];
            var totalZerado = denteTotal.toFixed(0);
            var totalDenteZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalDenteZerado);
            break
          // limpeza
          case "roupa":
            roupaVal = inputUser;
            roupaTotal = roupaVal*multips[2];
            var totalZerado = roupaTotal.toFixed(0);
            var totalRoupaZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalRoupaZerado);
            break
          case "louca":
            loucaVal = inputUser;
            loucaTotal = loucaVal*multips[3];
            var totalZerado = loucaTotal.toFixed(0);
            var totalLoucaZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalLoucaZerado);
            break
          case "carro":
            carroVal = inputUser;
            carroTotal = carroVal*multips[4];
            var totalZerado = carroTotal.toFixed(0);
            var totalCarroZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalCarroZerado);
            break
          case "jardim":
            jardimVal = inputUser;
            jardimTotal = jardimVal*multips[5];
            var totalZerado = jardimTotal.toFixed(0);
            var totalJardimZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalJardimZerado);
            break
          case "calcada":
            calcadaVal = inputUser;
            calcadaTotal = calcadaVal*multips[6];
            var totalZerado = calcadaTotal.toFixed(0);
            var totalCalcadaZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalCalcadaZerado);
            break
          // alimentos
          case "cereal":
            cerealVal = inputUser.toString().replace(/\,/g, '.');
            cerealTotal = cerealVal*multips[7];
            var totalZerado = cerealTotal.toFixed(0);
            var totalCerealZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalCerealZerado);
            break
          case "carne":
            carneVal = inputUser.toString().replace(/\,/g, '.');
            carneTotal = carneVal*multips[8];
            var totalZerado = carneTotal.toFixed(0);
            var totalCarneZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalCarneZerado);
            break
          case "laticineo":
            laticineoVal = inputUser.toString().replace(/\,/g, '.');
            laticineoTotal = laticineoVal*multips[9];
            var totalZerado = laticineoTotal.toFixed(0);
            var totalLaticineoZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalLaticineoZerado);
            break
          case "ovo":
            ovoVal = inputUser;
            ovoTotal = ovoVal*multips[10];
            var totalZerado = ovoTotal.toFixed(0);
            var totalOvoZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalOvoZerado);
            break
          case "vegetais":
            vegetaisVal = inputUser.toString().replace(/\,/g, '.');
            vegetaisTotal = vegetaisVal*multips[11];
            var totalZerado = vegetaisTotal.toFixed(0);
            var totalVegetaisZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalVegetaisZerado);
            break
          case "fruta":
            frutaVal = inputUser.toString().replace(/\,/g, '.');
            frutaTotal = frutaVal*multips[12];
            var totalZerado = frutaTotal.toFixed(0);
            var totalFrutaZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalFrutaZerado);
            break
          case "raiz":
            raizVal = inputUser.toString().replace(/\,/g, '.');
            raizTotal = raizVal*multips[13];
            var totalZerado = raizTotal.toFixed(0);
            var totalRaizZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalRaizZerado);
            break
          case "cafe":
            cafeVal = inputUser;
            cafeTotal = cafeVal*multips[14];
            var totalZerado = cafeTotal.toFixed(0);
            var totalCafeZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalCafeZerado);
            break
          case "cha":
            chaVal = inputUser;
            chaTotal = chaVal*multips[15];
            var totalZerado = chaTotal.toFixed(0);
            var totalChaZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalChaZerado);
            break
          default:
            console.log("fudeu");
        };

        // add totals and than show them
        var totalHigiene = banhoTotal+denteTotal;
        var totalLimpeza = roupaTotal+loucaTotal+carroTotal+jardimTotal+calcadaTotal;
        var totalAlimento = cerealTotal+carneTotal+laticineoTotal+ovoTotal+vegetaisTotal+frutaTotal+raizTotal+cafeTotal+chaTotal;
        // zerar as casas decimais
        var higieneTotalZerado = totalHigiene.toFixed(0);
        var higieneTotalZeradoNum = parseInt(higieneTotalZerado);
        var limpezaTotalZerado = totalLimpeza.toFixed(0);
        var limpezaTotalZeradoNum = parseInt(limpezaTotalZerado);
        var alimentoTotalZerado = totalAlimento.toFixed(0);
        var alimentoTotalZeradoNum = parseInt(alimentoTotalZerado);
        var totalPegadaPessoal = higieneTotalZeradoNum + limpezaTotalZeradoNum + alimentoTotalZeradoNum;
        
        $('.resultadoCategoria#totalHigiene').show().find('span').text(totalHigiene);
        $('.resultadoCategoria#totalLimpeza').show().find('span').text(totalLimpeza);
        $('.resultadoCategoria#totalAlimento').show().find('span').text(alimentoTotalZeradoNum);
        $('.resultadoTotal').find('span').text(totalPegadaPessoal);

        //  apagar resultado se vir vazio ou for 0
        var elementVal = element.val();



        if (elementVal == ""){
          element.next('.resultadoItem').hide();
        }

        //  apagar resultado se for 0
        if (value == 0){
          element.val("");
          element.next('.resultadoItem').hide();
        }

    }


// ******************************************** TRIGGER CALC WATER FOOTPRINT ********************************************************************

  $scope.triggerCalcWaterFootprint = function(id,value){

        var element = $('#'+id);

        calcWaterFootprint(element,value);

  };

// ******************************************** CHANGE WATER FOOTPRINT ********************************************************************

$scope.changeWaterFootprint = function(key,value){

      var tratedValue = value;

      var newData = {
        [key]:Number(tratedValue)
      }

      firebase.database().ref('/users/' + $scope.userId + '/minhaPegada/')
      .update(newData);

};

// ******************************************** ENTER VIEW ********************************************************************

  $scope.$on('$ionicView.enter', function(){

    // evitar inserir texto no input
    $('.resposta').keypress(function(event) {
      if(event.which < 44
      || event.which > 59) {
          event.preventDefault();
      } // prevent if not number/coma

      if(event.which == 44
      && $(this).val().indexOf(',') != -1) {
          event.preventDefault();
      } // prevent if already coma
    });
    //


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

      $('.resultadoTotalWrapper').show(150).delay(500).queue(function() {
           $('.goToHome').show().addClass('animated zoomIn');
           $(this).dequeue();
        });
      
    };
    //


// ******************************************** LEAVE VIEW ********************************************************************
  $scope.$on('$ionicView.leave', function(){

    // apagar o total e tal
    $('.resultadoTotalWrapper').hide();
    $('.goToHome').hide()
    //

  });



// ******************************************** LOADED VIEW ********************************************************************

  $scope.$on('$ionicView.loaded', function(){

  })

});