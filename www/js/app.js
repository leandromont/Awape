// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova','oauth1Client', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider, oauth1ClientProvider) {


  


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.history', {
      url: '/history',
      views: {
        'tab-history': {
          templateUrl: 'templates/tab-history.html',
          controller: 'HistoryCtrl'
        }
      }
    })

  .state('tab.list', {
    url: '/list',
    views: {
      'tab-list': {
        templateUrl: 'templates/tab-list.html',
        controller: 'ListCtrl'
      }
    }
  })

  .state('tab.list-edit-mode', {
    url: '/list-edit-mode',
    views: {
      'tab-extra': {
        templateUrl: 'templates/list-edit-mode.html',
        controller: 'ListEditModeCtrl'
      }
    }
  })

  .state('tab.product-detail', {
    url: '/product-detail',
    views: {
      'tab-extra': {
        templateUrl: 'templates/product-detail.html',
        controller: 'ProductDetailCtrl'
      }
    }
  })

   .state('tab.consumo', {
    url: '/consumo',
    views: {
      'tab-consumo': {
        templateUrl: 'templates/tab-consumo.html',
        controller: 'ConsumoCtrl'
      }
    }
  })

   .state('tab.consumo-edit-mode', {
    url: '/consumo-edit-mode',
    views: {
      'tab-extra': {
        templateUrl: 'templates/consumo-edit-mode.html',
        controller: 'ConsumoEditModeCtrl'
      }
    }
  })

  .state('tab.preferences', {
    url: '/preferences',
    views: {
      'tab-preferences': {
        templateUrl: 'templates/tab-preferences.html',
        controller: 'PreferencesCtrl'
      }
    }
  });

  $ionicConfigProvider.tabs.position('bottom');


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');


 //=============== Oauth Client Provider =============================== 
  oauth1ClientProvider.config({
        consumerKey: 'BzWStDYk6Fj3',
        consumerSecret: 'q9pl0oBdGdbq6K3fFqxarmoWWyJHtElyKrcW3jAbSvZrV3mt',
        requestEndpoint: 'http://awape.com.br/oauth1/request',
        authorizeEndpoint: 'http://awape.com.br/oauth1/authorize',
        accessEndpoint: 'http://awape.com.br/oauth1/access',
        oauthCallback: 'http://awape.com.br'
    });

});

