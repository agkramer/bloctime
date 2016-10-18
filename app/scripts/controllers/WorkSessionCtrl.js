(function() {
    function WorkSessionCtrl($scope, $interval, $firebaseArray) {
        var ref =  firebase.database().ref();

        window.foo = $firebaseArray(ref)

        this.createNewTask = () => {
            this.newTask.createdAt = Date.now()
            this.tasks.$add(this.newTask)
            this.newTask = {}
        }

        // CONSTANTS
        var WORK_TIME = 1500;
        var LONG_BREAK_TIME = 1500
        var SHORT_BREAK_TIME = 300;

        var runTimer;
        var workSessionsCompleted = 0;

        this.currentTime = WORK_TIME; // initialize currentTime with WORK_TIME
        this.timerButtonName = 'Start';
        this.onBreak = false;
        this.tasks = $firebaseArray(ref);

        var gongSound = new buzz.sound( "assets/sounds/gong.mp3", {
            preload: true
        });

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
                getCurrentTime();
            }
        };

        /*
        * @function startTimer
        * @desc starts timer, resets when timer hits 0
        */
        startTimer = function() {
            $ctrl.timerButtonName = 'Reset';
            runTimer = $interval(countDownTimer, 1000);
        };

        /*
        * @function countDown
        * @desc counts timer down, resets timer when timer hits 0
        */
        countDownTimer = function() {
            console.log('$interval function time: ' + $ctrl.currentTime);
            if ($ctrl.currentTime > 0) {
                console.log('$ctrl.currentTime > 0');
                $ctrl.currentTime -= 1;
            } else {
                resetTimer(runTimer);

                if ($ctrl.onBreak == false) {
                    workSessionsCompleted += 1;
                }

                console.log("Work Session Complete!");
                console.log("workSessionsCompleted = " + workSessionsCompleted);
                $ctrl.onBreak = !$ctrl.onBreak;

                gongSound.play();
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
            };

        /*
        * @function getCurrentTime
        * @desc gets BREAK_TIME or WORK_TIME
        */
        getCurrentTime = function() {
            if ($ctrl.onBreak && workSessionsCompleted % 4 === 0) {
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
        .controller('WorkSessionCtrl', ['$scope', '$interval','$firebaseArray', WorkSessionCtrl]);
})();
