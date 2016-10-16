(function() {
    function WorkSessionCtrl($interval) {

        // CONSTANTS
        var WORK_TIME = 5;
        var LONG_BREAK_TIME = 4
        var SHORT_BREAK_TIME = 2;

        var WORK_SESSIONS_COMPLETED = 0;

        var runTimer;

        this.currentTime = WORK_TIME; // initialize currentTime with WORK_TIME
        this.timerButtonName = 'Start';
        this.onBreak = false;


        var $ctrl = this;  // allows inner function to gain access to 'this'

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
            $ctrl.timerButtonName = 'Reset';
            runTimer = $interval(countDown, 1000);
        };

        /*
        * @function countDown
        * @desc counts timer down, resets timer when timer hits 0
        */
        countDown = function() {
            console.log('$interval function time: ' + $ctrl.currentTime);
            if ($ctrl.currentTime > 0) {
                console.log('$ctrl.currentTime > 0');
                $ctrl.currentTime -= 1;
            } else {
                resetTimer(runTimer);
                getCurrentTime();
            }
        };

        /*
        * @function resetTimer
        * @desc resets timer if not finished
        */
        resetTimer = function(foo) {
            console.log('timer reset');
            $interval.cancel(foo);
            $ctrl.timerButtonName = 'Start';

            if ($ctrl.onBreak == false) {
                WORK_SESSIONS_COMPLETED += 1;
            }

            console.log("WORK_SESSIONS_COMPLETED = " + WORK_SESSIONS_COMPLETED);
            $ctrl.onBreak = !$ctrl.onBreak;
            getCurrentTime();
        };

        /*
        * @function getCurrentTime
        * @desc gets BREAK_TIME or WORK_TIME
        */
        getCurrentTime = function() {
            if ($ctrl.onBreak && WORK_SESSIONS_COMPLETED % 4 == 0) {
                $ctrl.currentTime = LONG_BREAK_TIME;
            } else if ($ctrl.onBreak) {
                $ctrl.currentTime = SHORT_BREAK_TIME;
            } else {
                $ctrl.currentTime = WORK_TIME;
            }
        };
    } // end of WorkSessionCtrl


    angular
        .module('blocTime')
        .controller('WorkSessionCtrl', ['$interval', WorkSessionCtrl]);
})();
