angular.module('ShoppingListController', [])

    .controller('ShoppingListCtrl', function ($scope, $ionicLoading, ShoppingList) {

        $scope.$on('$ionicView.enter', function (e) {
            $scope.GetShoppingList();
        });

        $scope.shoppingList = [];

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
            if (article.menge == 0) {
                $scope.doRefresh();
            }
        };

        $scope.removeAll = function () {
            ShoppingList.removeAll();
            $scope.doRefresh();
        }
    });