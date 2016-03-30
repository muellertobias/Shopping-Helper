angular.module('SettingService', [])

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

