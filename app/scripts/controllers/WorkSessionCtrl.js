(function() {
    function WorkSessionCtrl($interval) {

        // CONSTANTS
        var SESSION_TIME = 5
        var BREAK_TIME = 2

        var runTimer = undefined;
        this.currentTime = SESSION_TIME
        this.timerButtonName = 'Start Session'

        var $ctrl = this  // allows inner function to gain access to 'this'

        /*
        * @function startResetTimer
        * @desc if timer is set - starts timer, if not - resets timer
        */
        this.startResetTimer = function () {
            if ($ctrl.timerButtonName == 'Start Session') {
                console.log('starting timer');
                startTimer();
            } else {
                resetTimer(runTimer);
            }
        };

        /*
        * @function startTimer
        * @desc starts timer, resets when timer hits 0
        */
        startTimer = function() {
            $ctrl.timerButtonName = 'Reset'

            runTimer = $interval(function() {
                console.log('$interval function time:  ' + $ctrl.currentTime);
                if ($ctrl.currentTime > 0 ) {
                    console.log('$ctrl.currentTime > 0');
                    $ctrl.currentTime -= 1;
                }
                else {
                    resetTimer(runTimer);
                }
            }, 1000);
        };

        /*
        * @function resetTimer
        * @desc resets timer if not finished
        */
        resetTimer = function(timer) {
            console.log('timer reset');
            $interval.cancel(timer);
            $ctrl.timerButtonName = 'Start Session';
            $ctrl.currentTime = SESSION_TIME;
        };
    }

    angular
        .module('blocTime')
        .controller('WorkSessionCtrl', ['$interval', WorkSessionCtrl]);
})();
