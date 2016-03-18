angular.module('starter.services', [])
    .factory('Articles', function () {
        var articles = [{
            id: 0,
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
                for (var i = 0; i < chats.length; i++) {
                    if (articles[i].id === parseInt(articleId)) {
                        return articles[i];
                    }
                }
                return null;
            }
        };
    });
