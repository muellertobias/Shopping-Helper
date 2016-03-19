angular.module('starter.controllers', [])

    //.controller('DashCtrl', function($scope) {})
    .controller('ArticlesCtrl', function ($scope, $localstorage, Articles, ShoppingList) {
        //With the new view caching in Ionic, Controllers are only called
        //when they are recreated or on app start, instead of every page change.
        //To listen for when this page is active (for example, to refresh data),
        //listen for the $ionicView.enter event:

        $scope.$on('$ionicView.enter', function (e) {
            $localstorage.setObject('0', {
                id: 0,
                name: 'Test',
                market: 'Edeka'
            });
        });

        $scope.articles = Articles.all();

        $scope.remove = function (article) {
            Articles.remove(article);
        };

        $scope.addToShoppingList = function (article) {
            ShoppingList.add(article);
        };

        $scope.addEmptyArticle = function () {
            Articles.addEmptyArticle();
        }
    })

    .controller('ShoppingListCtrl', function ($scope, ShoppingList) {
        
        $scope.shoppingList = ShoppingList.all();

        $scope.remove = function (article) {
            ShoppingList.remove(article);
        };

        $scope.removeAll = function () {
            ShoppingList.removeAll();
        }
    })
    .controller('ArticleEditorCtrl', function ($scope, $stateParams, Articles) {
        $scope.article = Articles.get($stateParams.articleId);
    })

.controller('SettingsCtrl', function ($scope) {
    $scope.settings = {
        enableDatabase: true
    };
});
