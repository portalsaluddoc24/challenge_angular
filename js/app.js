(function() {
  'use strict';

  angular
    .module('miApp', ['ui.router'])
    .config(configure)
    .controller('MainController', MainController);

  configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function configure($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/inicio');

    $stateProvider.state('inicio', {
      url: '/inicio',
      templateUrl: 'pages/inicio.html',
      controller: 'InicioController as inicioCtrl',
      resolve: {
        contenidoInicio: ['InicioService', function(InicioService) {
          return InicioService.obtenerDatosInicio()
            .then(function(response) {
              return response;
            })
            .catch(function(error) {
              console.log('Error obteniendo datos de inicio');
              throw error;
            });
        }] 
      }
    })
    $stateProvider.state('turnos', {
      url: '/turnos',
      templateUrl: 'pages/turnos.html',
      controller: 'TurnosController as turnosCtrl'
    });
  }

  MainController.$inject = ['$scope'];
  function MainController($scope) {
    console.log("asdfasdfasdfadswf");
  }
})();

(function() {
  'use strict';

  angular
    .module('miApp')
    .factory('EspecialidadService', ['$http', function($http) {
      var apiBaseUrl = `${window.location.origin}`;
      var obtenerEspecialidadesUrl = apiBaseUrl + '/data/especialidades.json';

      function obtenerEspecialidades() {
        return $http.get(obtenerEspecialidadesUrl)
          .then(function(response) {
            return response.data;
          })
          .catch(function(error) {
            console.error('Error al obtener especialidades:', error);
            throw error;
          });
      }

      return {
        obtenerEspecialidades: obtenerEspecialidades
      };
    }]);
})();
(function() {
  'use strict';

  angular
    .module('miApp')
    .factory('ProfesionalesService', ['$http', function($http) {
      var apiBaseUrl = `${window.location.origin}`;
      var obtenerProfesionalesUrl = apiBaseUrl + '/data/profesionales.json';

      function obtenerProfesionales() {
        return $http.get(obtenerProfesionalesUrl)
          .then(function(response) {
            console.log(response)
            return response.data;
          })
          .catch(function(error) {
            console.error('Error al obtener profesionales:', error);
            throw error;
          });
      }

      return {
        obtenerProfesionales: obtenerProfesionales
      };
    }]);
})();