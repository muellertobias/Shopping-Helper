angular.module('starter.services', [])
    .factory('Articles', function () {
        var articles = [{
            id: 0, // eine eindeutige ID!
            name: 'Brot',
            market: 'ALDI'
        }, {
            id: 1,
            name: 'Pizza Salami',
            market: 'ALDI'
        }, {
            id: 2,
            name: 'Gummihandschuhe',
            market: 'Edeka'
        }];
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
            add: function(article) {
                articles.push(article);
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
                while (articles.length > 0) {
                    articles.pop();
                }
            }
        };
    });