// Datenbank!
var db = null;

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $cordovaSQLite) {
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
        
        db = $cordovaSQLite.openDB("my.db");
        //db = $cordovaSQLite.openDatabase({ name: "my.db"});
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS articles (id integer primary key, name text, market text, icon text)");
    });
})

.config(function($stateProvider, $urlRouterProvider) {

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
      .state('tab.articles', {
          url: '/articles',
          views: {
              'tab-articles': {
                  templateUrl: 'templates/tab-articles.html',
                  controller: 'ArticlesCtrl'
              }
          }
      })

      .state('tab.shoppingList', {
          url: '/shoppingList',
          views: {
              'tab-shoppingList': {
                  templateUrl: 'templates/tab-shoppingList.html',
                  controller: 'ShoppingListCtrl'
              }
          }
      })
    .state('tab.article-editor', {
        url: '/articles/:articleId',
        views: {
            'tab-articles': {
                templateUrl: 'templates/article-editor.html',
                controller: 'ArticleEditorCtrl'
            }
        }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/shoppingList');

});
