(function() {
  'use strict';

  angular
    .module('miApp')
    .factory('ProfesionalesService', ['$http', function($http) {
      var apiBaseUrl = `${window.location.origin}`;
      var obtenerProfesionalesUrl = apiBaseUrl + '/data/profesionales.json';

      function obtenerProfesionalesPorEspecialidad(especialidadId) {
        return $http.get(obtenerProfesionalesUrl)
          .then(function(response) {
            return response.data.filter(function(profesional) {
              return profesional.especialidad === especialidadId;
            });
          })
          .catch(function(error) {
            console.error('Error al obtener profesionales:', error);
            throw error;
          });
      }

      return {
        obtenerProfesionalesPorEspecialidad: obtenerProfesionalesPorEspecialidad
      };
    }]);
})();