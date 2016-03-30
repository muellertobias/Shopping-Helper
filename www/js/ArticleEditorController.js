angular.module('ArticleEditorController', [])

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
    });
