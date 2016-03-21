angular.module('starter.controllers', [])
    
    //.controller('DashCtrl', function($scope) {})
    .controller('ArticlesCtrl', function ($scope, Articles, ShoppingList) {
        //With the new view caching in Ionic, Controllers are only called
        //when they are recreated or on app start, instead of every page change.
        //To listen for when this page is active (for example, to refresh data),
        //listen for the $ionicView.enter event:
       
        $scope.$on('$ionicView.enter', function (e) {
            //$localstorage.setObject('0', {
            //    id: 0,
            //    name: 'Test',
            //    market: 'Edeka'
            //});
        });

       
        $scope.articles = Articles.all();
        
        $scope.doRefresh = function () {
            $scope.articles = Articles.all();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

        $scope.remove = function (article) {
            Articles.remove(article);
        };

        //$scope.get = function (articleId) {
        //    for (var i = 0; i < $scope.articles; i++) {
        //        if ($scope.articles[i].id == articleId) {
        //            return $scope.articles[i];
        //        }
        //    }
        //    return null;
        //};

        $scope.addToShoppingList = function (article) {
            ShoppingList.add(article);
        };

        $scope.addEmptyArticle = function () {
            Articles.addEmptyArticle();
        }
    })

    .controller('ShoppingListCtrl', function ($scope, ShoppingList) {
        
        $scope.shoppingList = ShoppingList.all();

        $scope.doRefresh = function () {
            $scope.shoppingList = ShoppingList.all();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

        $scope.remove = function (article) {
            ShoppingList.remove(article);
        };

        $scope.removeAll = function () {
            ShoppingList.removeAll();
        }
    })
    .controller('ArticleEditorCtrl', function ($scope, $stateParams, Articles) {
        //$scope.$on('$ionicView.enter', function (e) {
        //    $scope.article = 
        //});

        $scope.article = Articles.get($stateParams.articleId);;

        $scope.icons = [
            { text: 'Buch', value: 'img/icons/android-book.png' },
            { text: 'Pizza', value: 'img/icons/pizza.png' },
            { text: 'Herz', value: 'img/icons/heart.png' },
            { text: 'Uni', value: 'img/icons/university.png' },
            { text: 'Bier', value: 'img/icons/beer.png' },
            { text: 'Kaffee', value: 'img/icons/coffee.png' },
            { text: 'Chemie', value: 'img/icons/beaker.png' }
        ];

        $scope.update = function () {
            console.log($stateParams);
            Articles.update($scope.article);
        }
    })

.controller('SettingsCtrl', function ($scope) {
    $scope.settings = {
        enableDatabase: true
    };
});
