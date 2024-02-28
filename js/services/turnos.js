(function() {
    'use strict';
  
    angular
        .module('miApp')
        .factory('TurnosService', TurnosService);
  
    TurnosService.$inject = ['$http'];
  
    function TurnosService($http) {
        var service = this;
  
        var apiBaseUrl = `${window.location.origin}`;
  
        service.solicitarTurnoUrl = apiBaseUrl + '/data/turnos.json';
  
        service.solicitarTurno = function(turno) {
            var promise = $http.get(service.solicitarTurnoUrl, turno)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    console.error('Error al solicitar turno:', error);
                    throw error;
                });
  
            return promise;
        };
  
        return {
            solicitarTurno: function(turno) {
                return service.solicitarTurno(turno);
            }
        };
    }
  })();
  