angular.module('starter.services', ['ionic.utils'])
    .factory('Articles', function (Settings, $localstorage) {
        var articles = [{
            id: 0, // eine eindeutige ID!
            name: 'Brot',
            icon: 'img/icons/pizza.png',
            market: 'ALDI'
        }, {
            id: 1,
            name: 'Pizza Salami',
            icon: 'img/icons/pizza.png',
            market: 'ALDI'
        }, {
            id: 2,
            name: 'Gummihandschuhe',
            icon: 'img/icons/beaker.png',
            market: 'Edeka'
        }];
        //var articles = [];
        return {
            all: function () {
                //articles = $localstorage.getObject('articles');
                return articles;
            },
            remove: function (article) {
                articles.splice(articles.indexOf(article), 1);
                //$localstorage.setObject('articles', articles);
            },
            get: function (articleId) {
                for (var i = 0; i < articles.length; i++) {
                    if (articles[i].id === parseInt(articleId)) {
                        return articles[i];
                    }
                }
                return null;
            },
            add: function (article) {
                
                articles.push(article);
                //$localstorage.setObject('articles', articles);
            },
            addEmptyArticle: function () {
                var article = {
                    id: articles.length,
                    name: 'Empty',
                    market: 'Unknown'
                }
                this.add(article);
            }
        };
    })

    .factory('ShoppingList', function () {
        var articles = [];
        return {
            all: function () {
                return articles;
            },
            remove: function (article) {
                articles.splice(articles.indexOf(article), 1);
            },
            get: function (articleId) {
                for (var i = 0; i < articles.length; i++) {
                    if (articles[i].id === parseInt(articleId)) {
                        return articles[i];
                    }
                }
                return null;
            },
            add: function (article) {
                var tmp = this.get(article.id);

                if (tmp != null) {
                    tmp.menge++;
                } else {
                    article.menge = 1;
                    articles.push(article);
                }
            },
            removeAll: function () {
                for (var i = 0; i < articles.length; i++) {
                    if (articles[i].inBasket) {
                        articles[i].inBasket = false;
                        articles.splice(i, 1);
                    }
                }
            }
        };
    })

    .factory('Settings', function () {
        var settings = {
            enableDatabase: false,
            databaseAddress: 'Empty'
        };
        return {
            get: function () {
                return settings;
            }
        }
    });


angular.module('ionic.utils', []).factory('$localstorage', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '[]');
        }
    }
}]);