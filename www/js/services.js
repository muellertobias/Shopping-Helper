angular.module('starter.services', [])
    .factory('Articles', function (Settings, $cordovaSQLite) {
        //var articles = [{
        //    id: 0, // eine eindeutige ID!
        //    name: 'Brot',
        //    icon: 'img/icons/pizza.png',
        //    market: 'ALDI'
        //}, {
        //    id: 1,
        //    name: 'Pizza Salami',
        //    icon: 'img/icons/pizza.png',
        //    market: 'ALDI'
        //}, {
        //    id: 2,
        //    name: 'Gummihandschuhe',
        //    icon: 'img/icons/beaker.png',
        //    market: 'Edeka'
        //}];
        var articles = [];
        var article = null;
        return {
            all: function () {
                articles = [];
                var query = "SELECT id, name, icon, market FROM articles";
                $cordovaSQLite.execute(db, query).then(function (result) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var article = {
                            id: result.rows.item(i).id,
                            name: result.rows.item(i).name,
                            icon: result.rows.item(i).icon,
                            market: result.rows.item(i).market
                        };
                        articles.push(article);
                    }
                    
                }, function (error) {
                    console.log(error);
                })


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
                
                //var query = "SELECT id, name, icon, market FROM articles WHERE id = ?";
                //$cordovaSQLite.execute(db, query, [articleId]).then(function (result) {
                //    if (result.rows.length > 0) {
                //        article = {
                //            id: result.rows.item(0).id,
                //            name: result.rows.item(0).name,
                //            icon: result.rows.item(0).icon,
                //            market: result.rows.item(0).market
                //        };
                //    }
                //}, function (error) {
                //    console.log(error);
                //})
                //return article;
               },
            add: function (article) {
                var query = "INSERT INTO articles (name, market, icon) VALUES (?, ?, ?)";
                $cordovaSQLite.execute(db, query, [article.name, article.market, article.icon]).then(function (result) {
                    console.log("INSERT ID -> " + result.insertId);
                }, function (error) {
                    console.log(error);
                })
                //articles.push(article);
                //$localstorage.setObject('articles', articles);
            },
            addEmptyArticle: function () {
                var article = {
                    id: 0,
                    name: 'Ohne Namen',
                    icon: 'img/icons/beaker.png',
                    market: 'Keiner'
                }
                this.add(article);
            },
            update: function (article) {
                var query = "UPDATE articles SET name = ?, market = ?, icon = ? WHERE id = ?";
                $cordovaSQLite.execute(db, query, [article.name, article.market, article.icon, article.id]).then(function (result) {
                    console.log("UPDATED ID -> " + result.insertId);
                }, function (error) {
                    console.log(error);
                })
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


//angular.module('ionic.utils', []).factory('$localstorage', ['$window', function($window) {
//    return {
//        set: function(key, value) {
//            $window.localStorage[key] = value;
//        },
//        get: function(key, defaultValue) {
//            return $window.localStorage[key] || defaultValue;
//        },
//        setObject: function(key, value) {
//            $window.localStorage[key] = JSON.stringify(value);
//        },
//        getObject: function(key) {
//            return JSON.parse($window.localStorage[key] || '[]');
//        }
//    }
//}]);