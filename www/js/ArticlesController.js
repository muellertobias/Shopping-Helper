angular.module('ArticlesController', [])

    .controller('ArticlesCtrl', function ($scope, $state, Articles, ShoppingList, $ionicPopup, $timeout) {

        $scope.$on('$ionicView.enter', function (e) {
            $scope.doRefresh();
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
            var popup = $ionicPopup.alert({
                title: article.name + ' hinzugef&uuml;gt!',
                template: ''
            });
            $timeout(function () {
                popup.close();
            }, 500);
        };

        $scope.addEmptyArticle = function () {
            $state.go('tab.article-editor');
        }
    });
