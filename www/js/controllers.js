angular.module('starter.controllers', [])
    
.controller('SettingsCtrl', function ($scope, $ionicPopup, Articles) {

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
