angular.module('starter.controllers')

// ==================== Controller List edit mode ===========================
.controller('ListEditModeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $ionicSlideBoxDelegate,$ionicScrollDelegate) {

  // $scope.scanBarcode = function() {
  //   $cordovaBarcodeScanner.scan().then(function(imageData) {
  //     alert(imageData.text);
  //     console.log("Barcode Format -> " + imageData.format);
  //     console.log("Cancelled -> " + imageData.cancelled);
  //   }, function(error) {
  //     alert("An error happened -> " + error);
  //   });
  // };

  $scope.slideChanged = function(index) {
      $scope.slideIndex = index;

      if(index === 1){
        $('.tutorial .slidebox1 .phoneImage').addClass('animated fadeInUp').delay(1500).queue(function() {
          $('.tutorial .slidebox1 .tutorialWrapper').addClass('animated zoomIn').css("opacity", "1").delay(1000).queue(function() {
            $('.tutorial .slidebox1 .textoHolder  p:nth-child(1)').addClass('animated fadeIn').show(150).delay(1500).queue(function() {
              $('.tutorial .slidebox1 .textoHolder  p:nth-child(2)').addClass('animated fadeIn').show(150).delay(1500).queue(function(){
                $('.tutorial .slidebox1 .textoHolder  p:nth-child(3)').addClass('animated fadeIn').show(150).delay(1250).queue(function(){
                  $('.tutorial .slidebox1 button.botao').addClass('animated zoomIn').css("opacity", "1");
                });
              });
            });
          });
        });
      }

      if(index === 2){
        $('.tutorial .slidebox2 .phoneImage').addClass('animated fadeInUp').delay(1500).queue(function() {
          $('.tutorial .slidebox2 .tutorialWrapper').addClass('animated zoomIn').css("opacity", "1").delay(1000).queue(function() {
            $('.tutorial .slidebox2 .textoHolder  p:nth-child(1)').addClass('animated fadeIn').show(250).delay(1500).queue(function() {
              $('.tutorial .slidebox2 .textoHolder  p:nth-child(2)').addClass('animated fadeIn').show(250).delay(1250).queue(function(){
                $('.tutorial .slidebox2 button.botao').addClass('animated zoomIn').css("opacity", "1");
              });
            });
          });
        });
      }

      if(index === 3){
        $('.tutorial .slidebox3 .phoneImage').addClass('animated fadeInUp').delay(1500).queue(function() {
          $('.tutorial .slidebox3 .tutorialWrapper').addClass('animated zoomIn').css("opacity", "1").delay(1000).queue(function() {
            $('.tutorial .slidebox3 .textoHolder  p').addClass('animated fadeIn').show(250).delay(1250).queue(function() {
              $('.tutorial .slidebox3 button.botao').addClass('animated zoomIn').css("opacity", "1");
            });
          });
        });
      }

      if(index === 4){
        $('.tutorial .slidebox4 .textoHolder p span#ah').addClass('animated fadeInUp').delay(1000).queue(function() {
          $('.tutorial .slidebox4 .textoHolder p:nth-child(1)').addClass('animated fadeInUp').delay(1000).queue(function() {
            $('.tutorial .slidebox4 .textoHolder p:nth-child(2)').addClass('animated fadeInUp').delay(1000).queue(function() {
              $('.tutorial .slidebox4 .textoHolder p:nth-child(3)').addClass('animated fadeInUp').delay(1000).queue(function(){
              $('.tutorial .slidebox4 .botao').addClass('animated zoomIn').css("opacity", "1");
            });
              });
            });
        });
      }
      
      if(index === 5){
        $('.tutorial .slidebox5 .phoneImage').addClass('animated fadeInUp').delay(1500).queue(function() {
          $('.tutorial .slidebox5 .tutorialWrapper').addClass('animated zoomIn').css("opacity", "1").delay(1000).queue(function() {
            $('.tutorial .slidebox5 .textoHolder  p:nth-child(1)').addClass('animated fadeIn').show(150).delay(1500).queue(function() {
              $('.tutorial .slidebox5 .textoHolder  p:nth-child(2)').addClass('animated fadeIn').show(150).delay(1500).queue(function(){
                $('.tutorial .slidebox5 .textoHolder  p:nth-child(3)').addClass('animated fadeIn').show(150).delay(850).queue(function(){
                  // aparecer o pager no último slidebox
                  $ionicSlideBoxDelegate.enableSlide(true);
                  $('.tutorial .slider-pager').show(800).delay(850).queue(function(){
                    $('.tutorial .slidebox5 button.botao').addClass('animated zoomIn').css("opacity", "1");
                  });
                });
              });
            });
          });
        });
      }
      
    };

    $scope.disableSwipe = function() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };

    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.goToHome = function() {
      document.location.href = '/#/tab/home';
    };

  $scope.$on('$ionicView.loaded', function(){
    $('.tutorial .slidebox0 .titulo span').addClass('animated fadeInUp').delay(1000).queue(function() {
      $('.tutorial .slidebox0 .titulo p').addClass('animated fadeInUp').delay(1000).queue(function() {
        $('.tutorial .slidebox0 .textoHolder p').addClass('animated fadeIn').delay(1000).queue(function() {
          $('.tutorial .slidebox0 .textoHolder .botao').addClass('animated zoomIn').css("opacity", "1").delay(1000).queue(function() {
            $('.tutorial .slidebox0 .textoHolder .pular').addClass('animated zoomIn').css("opacity", "0.7");
            });
          });
        });
    });
  });


  $scope.$on('$ionicView.enter', function(){
    // $scope.userData = Auth.get.user.id()

    //hide nav-bar and display full height
    $('.tabs-striped .tabs').hide();
    $('.tutorial').css("height", "101vh");
    //

    

  });

  $scope.$on('$ionicView.leave', function(){
    $('.tabs-striped .tabs').show();
  });

})