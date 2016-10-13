(function() {
    function timer($interval) {
        return {
            templateUrl: '/templates/directives/timer.html',
        };



    }

    angular
        .module('blocTime')
        .directive('timer', ['$interval', timer]);
})();
