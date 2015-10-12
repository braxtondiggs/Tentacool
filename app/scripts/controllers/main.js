'use strict';
angular.module('tentacoolApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$mdSidenav', '$mdDialog', '$mdToast', '$localStorage', function($scope, $rootScope, $mdSidenav, $mdDialog, $mdToast, $localStorage) {
        $scope.$storage = $localStorage.$default({
            task: []
        });

        $scope.openMenu = function(index) {
            $mdSidenav('right').open();
            $scope.index = index;
            if ($scope.$storage.task[index].date) {
                $scope.$storage.task[index].date = new Date($scope.$storage.task[index].date);
            } else {
                $scope.$storage.task[index].date = new Date();
            }
        };
        $scope.addItem = function(task, ev) {
            if (typeof task !== 'undefined' && task.trim().length > 0) {
                $scope.$storage.task.push({
                    name: task,
                    date: $scope.date,
                    desc: null,
                    isCompleted: false
                });
                $rootScope.widgetExpanded = $rootScope.widgetExpanded = !$rootScope.widgetExpanded;
                $scope.addTask = '';
                $mdToast.show(
                    $mdToast.simple()
                    .content('Added New Task!')
                    .position('bottom right')
                    .hideDelay(3000)
                );
            } else {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Task App - Error')
                    .content('Looks like you forgot to fill out the task name, please name your task.')
                    .ariaLabel('Task App')
                    .ok('Ok!')
                    .targetEvent(ev)
                );
            }
        };
        $scope.remove = function(index) {
            var confirm = $mdDialog.confirm()
                .title('Task App')
                .content('Are you sure you want to delete this task?')
                .ok('Delete!')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                $scope.$storage.task.splice(index, 1);
                $mdSidenav('right').close();
                $mdToast.show(
                    $mdToast.simple()
                    .content('Task Deleted!')
                    .position('bottom right')
                    .hideDelay(3000)
                );
            }, function() {});
        };
    }]);
