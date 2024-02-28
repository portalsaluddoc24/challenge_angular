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
              // console.log(response)
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