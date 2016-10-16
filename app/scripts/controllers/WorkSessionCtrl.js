(function() {
    function WorkSessionCtrl($interval) {

        // CONSTANTS
        var WORK_TIME = 5
        var BREAK_TIME = 2

        // var SESSION_TIME = 5

        var runTimer;

        this.currentTime = WORK_TIME; // initialize currentTime with WORK_TIME
        this.timerButtonName = 'Start';
        this.onBreak = false;


        var $ctrl = this  // allows inner function to gain access to 'this'

        /*
        * @function startResetTimer
        * @desc if timer is set - starts timer, if not - resets timer
        */
        this.startResetTimer = function () {
            if ($ctrl.timerButtonName == 'Start') {
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
                    $ctrl.onBreak = !$ctrl.onBreak;

                    if ($ctrl.onBreak) {
                        $ctrl.currentTime = BREAK_TIME;
                    } else {
                        $ctrl.currentTime = WORK_TIME;
                    }

                }
            }, 1000);
        };

        /*
        * @function resetTimer
        * @desc resets timer if not finished
        */
        resetTimer = function(foo) {
            console.log('timer reset');
            $interval.cancel(foo);
            $ctrl.timerButtonName = 'Start';
            
            if ($ctrl.onBreak) {
                $ctrl.currentTime = BREAK_TIME;
            } else {
                $ctrl.currentTime = WORK_TIME;
            }

            // $ctrl.currentTime = SESSION_TIME;
        };
    }

    angular
        .module('blocTime')
        .controller('WorkSessionCtrl', ['$interval', WorkSessionCtrl]);
})();
