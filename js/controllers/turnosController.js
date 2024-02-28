(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('TurnosController', ['$scope', 'EspecialidadService', 'ProfesionalesService', 'TurnosService', function($scope, EspecialidadService, ProfesionalesService, TurnosService) {
      EspecialidadService.obtenerEspecialidades()
        .then(function(especialidades) {
          $scope.especialidades = especialidades;
        })
        .catch(function(error) {
          console.error('Error al obtener especialidades:', error);
        });

      // Variables para controlar la visibilidad de los campos
      $scope.selectedHorarios = {};
      $scope.mostrarHorarios = false;
      $scope.mostrarCampos = false;
      $scope.mostrarFormulario = true;

      // Función para cargar los profesionales al seleccionar una especialidad
      $scope.seleccionarEspecialidad = function() {
        if ($scope.selectedEspecialidad) {
          ProfesionalesService.obtenerProfesionalesPorEspecialidad($scope.selectedEspecialidad.id)
            .then(function(profesionales) {
              $scope.profesionales = profesionales;
              $scope.mostrarHorarios = true; // Mostrar los horarios al seleccionar un profesional
            })
            .catch(function(error) {
              console.error('Error al obtener profesionales:', error);
            });
        }
      };

      // Función para habilitar los campos al seleccionar un horario
      $scope.seleccionarHorario = function(horario) {
        if ($scope.selectedHorarios[horario.dia]) {
          $scope.mostrarCampos = true;
        } else {
          $scope.mostrarCampos = false;
        }

        
        if (!$scope.selectedHorarios[horario.dia]) {
          angular.forEach($scope.selectedProfesional.horarios, function(h) {
            $scope.selectedHorarios[h.dia] = false;
          });
        }
      };

      // Función para enviar la solicitud de turno
      $scope.solicitarTurno = function() {
        
        TurnosService.solicitarTurno({
        }).then(function(resultado) {
          $scope.resultado = resultado;
          $scope.mostrarFormulario = false; 
        }).catch(function(error) {
          console.error('Error al solicitar turno:', error);
        });
      };
    }]);
})();