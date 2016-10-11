(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase:false
            });

        $stateProvider
            .state('landing', {
                url: '/',
                templateUrl: '/templates/landing.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'templates/about.html'
            })
            .state('workSession', {
                url: 'work_session',
                templateUrl: 'templates/work_session.html'
            })
    }

    angular
        .module('blocTime', ['ui.router'])
        .config(config);
})();
