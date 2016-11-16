

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
'Use Strict';
angular.module('starter', ['ngStorage', 'starter.controllers', 'starter.services','firebase', 'pascalprecht.translate','ngMessages','ui.router'])

.run(function() {
  
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider, $translateStaticFilesLoaderProvider) {

  $stateProvider


  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.list', {
    url: '/list',
    views: {
      'tab-list': {
        templateUrl: 'templates/tab-list.html',
        controller: 'ListCtrl'
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

    ;

// ========== firebase app

});

