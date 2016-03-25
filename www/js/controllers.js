angular.module('starter.controllers', [])
    
    //.controller('DashCtrl', function($scope) {})
    .controller('ArticlesCtrl', function ($scope, $state, Articles, ShoppingList) {
        //With the new view caching in Ionic, Controllers are only called
        //when they are recreated or on app start, instead of every page change.
        //To listen for when this page is active (for example, to refresh data),
        //listen for the $ionicView.enter event:
       
        $scope.$on('$ionicView.enter', function (e) {
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

        $scope.addToShoppingList = function (article) {
            ShoppingList.add(article);
        };

        $scope.addEmptyArticle = function () {
            $state.go('tab.article-editor');
            //$scope.doRefresh();
        }
    })

    .controller('ShoppingListCtrl', function ($scope, ShoppingList) {
        
        $scope.$on('$ionicView.enter', function (e) {
            $scope.GetShoppingList();
        });

        //$scope.shoppingList = [];

        $scope.GetShoppingList = function () {
            ShoppingList.all().then(function (shoppingList) {
                $scope.shoppingList = shoppingList;
            });
        }

        $scope.doRefresh = function () {
            $scope.GetShoppingList();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

        $scope.changeInBasket = function (article) {
            ShoppingList.toggleInBasket(article);
        };

        $scope.add = function (article) {
            ShoppingList.add(article);
        };

        $scope.remove = function (article) {
            ShoppingList.remove(article);
            $scope.doRefresh();
        };

        $scope.removeAll = function () {
            ShoppingList.removeAll();
            $scope.doRefresh();
        }
    })
    .controller('ArticleEditorCtrl', function ($scope, $stateParams, $state, Articles) {

        $scope.$on('$ionicView.enter', function (e) {
            $scope.GetArticle();
        });

        $scope.GetArticle = function () {
            var id;
            if ($stateParams.articleId == "") {
                id = new Date().getTime();
                Articles.addEmptyArticle(id);
            } else {
                id = $stateParams.articleId;
            }
            Articles.get(id).then(function (article) {
                    $scope.article = article;
                });
        }

        $scope.GetArticleAsync = function (article) {
            $scope.article = article;
        }

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
            Articles.update($scope.article);
            $state.go('tab.articles');
        }

        $scope.deleteThisArticle = function () {
            Articles.deleteArticle($scope.article);
            $state.go('tab.articles');
        }
    })

.controller('SettingsCtrl', function ($scope) {
    $scope.settings = {
        enableDatabase: true
    };
});
