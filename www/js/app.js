// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
'Use Strict';
angular.module('starter', ['ionic','ngStorage', 'ngCordova', 'starter.controllers', 'starter.services','firebase', 'pascalprecht.translate','ngMessages'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    // setTimeout(function() {
    //     navigator.splashscreen.hide();
    // }, 100);



    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider, $translateProvider, $translateStaticFilesLoaderProvider) {

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
          controller: 'HomeCtrl',
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

  .state('tab.search', {
    url: '/search',
    views: {
      'tab-extra': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
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
  })

  .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller:'homeController'
    })
    ;

  $ionicConfigProvider.tabs.position('bottom');


  // if none of the above states are matched, use this as the fallback
 $urlRouterProvider.otherwise("/login");

// ========== firebase app

}).constant('FURL', {
    apiKey: "AIzaSyB7481A5OJBVzX3Hs8hTC6i_nUL5k1zDeg",
    authDomain: "awape-2d96e.firebaseapp.com",
    databaseURL: "https://awape-2d96e.firebaseio.com",
    storageBucket: "awape-2d96e.appspot.com",
    messagingSenderId: "923520319461"
  })
;

