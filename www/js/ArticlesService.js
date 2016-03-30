angular.module('ArticlesService', [])
    .factory('Articles', function (Settings, $q, $cordovaSQLite) {
        var articles = [];
        return {
            deleteTable: function () {
                articles = [];
                var query = "DELETE FROM articles";
                $cordovaSQLite.execute(db, query).then(function (result) {
                    
                }, function (error) {
                    console.log(error);
                });
            },
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
                });
                return articles;
            },
            remove: function (article) {
                articles.splice(articles.indexOf(article), 1);
                article = null;
            },
            get: function (articleId) {
                var q = $q.defer();
                var query = "SELECT id, name, icon, market FROM articles WHERE id = ?";
                $cordovaSQLite.execute(db, query, [articleId]).then(function (result) {
                    if (result.rows.length > 0) {
                        var article = {
                            id: result.rows.item(0).id,
                            name: result.rows.item(0).name,
                            icon: result.rows.item(0).icon,
                            market: result.rows.item(0).market
                        };
                        q.resolve(article);
                    }
                }, function (error) {
                    console.log(error);
                    q.reject(null);
                })
                return q.promise;
            },
            add: function (article) {
                var q = $q.defer();
                var query = "INSERT INTO articles (id, name, market, icon) VALUES (?, ?, ?, ?)";
                $cordovaSQLite.execute(db, query, [article.id, article.name, article.market, article.icon]).then(function (result) {
                    console.log("INSERT ID -> " + result.insertId);
                    q.resolve();
                }, function (error) {
                    console.log(error);
                    q.reject(null);
                });
                return q.promise;
            },
            addEmptyArticle: function (newID) {
                var article = {
                    id: newID,
                    name: '',
                    icon: 'img/icons/beaker.png',
                    market: ''
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
            },
            deleteArticle: function (article) {
                var query = "DELETE FROM articles WHERE id = ?";
                $cordovaSQLite.execute(db, query, [article.id]).then(function (result) {
                    console.log("DELETED ID -> " + result.insertId);
                }, function (error) {
                    console.log(error);
                })
            },
        };
    })
