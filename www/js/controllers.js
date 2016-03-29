angular.module('starter.controllers', [])
    
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
    })

    .controller('ShoppingListCtrl', function ($scope, ShoppingList) {
        
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
            { text: 'Chemie', value: 'img/icons/beaker.png' },
            { text: 'Technik', value: 'img/icons/android-lightbulb.png' },
            { text: 'Lebensmittel', value: 'img/icons/egg.png' },
            { text: 'Eis', value: 'img/icons/icecream.png' },
            { text: 'Auto', value: 'img/icons/model-s.png' },
            { text: 'Gabel', value: 'img/icons/fork.png' },
            { text: 'Hammer', value: 'img/icons/hammer.png' },
            { text: 'Blatt', value: 'img/icons/leaf.png' }
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

.controller('SettingsCtrl', function ($scope, $ionicPopup, Articles) {
    $scope.settings = {
        enableDatabase: true
    };

    $scope.loadExample = function () {
        Articles.deleteTable();
        var article = {
            id: 1,
            name: 'Brot',
            market: 'ALDI',
            icon: 'img/icons/pizza.png'
        }
        Articles.add(article);
        article = {
            id: 2,
            name: 'Kaffee',
            market: 'ALDI',
            icon: 'img/icons/coffee.png'
        }
        Articles.add(article);
        article = {
            id: 3,
            name: 'Sp&uuml;lmittel',
            market: 'ALDI',
            icon: 'img/icons/beaker.png'
        }
        Articles.add(article);
        article = {
            id: 4,
            name: 'Pizza Salami',
            market: 'Edeka',
            icon: 'img/icons/pizza.png'
        }
        Articles.add(article);
    }

    $scope.aboutUs = function () {
        var popup = $ionicPopup.alert({
            title: '&Uuml;ber Uns',
            template: 'Der ShoppingHelper ist im Rahmen der Lehrveranstaltung \"Internet-Technologien\" im 5. Semester des Bachelorstudiengangs Kommunikationsinformatik entstanden.\nDie Entwickler sind: Patrick Bund, Sebastian K&ouml;rner, Tobias M&uuml;ller und Chin-Hao Ou'
        });
    }
});
