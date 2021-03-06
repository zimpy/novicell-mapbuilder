angular.module('umbraco')
.controller('Novicell.OverviewController', function ($scope, $routeParams, mapBuilderResource, localizationService, navigationService) {
    var ctrl = this;

    // Sets up an object for binding
    ctrl.name = '';
    ctrl.items = [];
    ctrl.typeName = '';

    if ($routeParams.id === 'Maps') {
        localizationService.localize("ncmb_maps").then(function (value) {
            ctrl.name = value;
        });
        ctrl.typeName = 'map-';

        mapBuilderResource.getAllMaps().then(function (response) {
            ctrl.items = response.data;
        });
    }
    else if ($routeParams.id === 'Data') {
        localizationService.localize("ncmb_data").then(function (value) {
            ctrl.name = value;
        });
        ctrl.typeName = 'data-';

        mapBuilderResource.getAllDataSources().then(function (response) {
            ctrl.items = response.data;
        });
    }
    else if ($routeParams.id.indexOf('map-') !== -1) {
        ctrl.typeName = 'EditMaps';
    }
    else if ($routeParams.id.indexOf('data-') !== -1) {
        ctrl.typeName = 'EditData';
    }

    navigationService.syncTree({ tree: 'MapBuilderTree', path: ["-1", $routeParams.id] });

}).filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});