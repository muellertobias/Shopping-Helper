angular.module('starter.controllers', [])

    //.controller('DashCtrl', function($scope) {})
    .controller('ArticlesCtrl', function ($scope, Articles, ShoppingList) {
        $scope.articles = Articles.all();

        $scope.remove = function (article) {
            Articles.remove(article);
        };

        $scope.add = function (article) {
            ShoppingList.add(article);
        };
    })

    .controller('ShoppingListCtrl', function ($scope, ShoppingList) {
        $scope.shoppingList = ShoppingList.all();

        $scope.remove = function (article) {
            ShoppingList.remove(article);
        };

        $scope.removeAll = function () {
            ShoppingList.removeAll();
        }
    });



//.controller('ChatsCtrl', function($scope, Chats) {
//  // With the new view caching in Ionic, Controllers are only called
//  // when they are recreated or on app start, instead of every page change.
//  // To listen for when this page is active (for example, to refresh data),
//  // listen for the $ionicView.enter event:
//  //
//  //$scope.$on('$ionicView.enter', function(e) {
//  //});

//  $scope.chats = Chats.all();
//  $scope.remove = function(chat) {
//    Chats.remove(chat);
//  };
//})

//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);
//})

//.controller('AccountCtrl', function($scope) {
//  $scope.settings = {
//    enableFriends: true
//  };
//});
