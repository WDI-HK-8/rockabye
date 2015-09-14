angular.module('starter', ['ionic', 'starter.controllers', 'ng-token-auth', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.guidelines', {
    url: '/guidelines',
    views: {
      'menuContent': {
        templateUrl: 'templates/guidelines.html'
      }
    }
  })
  .state('app.mylullabies', {
      url: '/mylullabies',
      views: {
        'menuContent': {
          templateUrl: 'templates/mylullabies.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.record', {
      url: '/record',
      views: {
        'menuContent': {
          templateUrl: 'templates/record.html', 
          controller: 'PlaylistsCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');

  $authProvider.configure({
    apiUrl: 'https://rails-rockabye.herokuapp.com/api/v1' || 'http://localhost:3000/api/v1'
  });
});
