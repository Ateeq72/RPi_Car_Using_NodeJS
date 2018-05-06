var myApp = function (){

        this.gpio = require('rpi-gpio');
        this.exec = require('child_process').exec;
        this.accP1 = 23;
        this.accP2 = 24;
        this.accEN = 25;
        this.steerP1 = 17;
        this.steerP2 = 27;
        this.steerEN = 22;
        this.pirSensor = 21;

        this.setSocketVar = function (socket) {
            this.socket = socket;
        }

        this.initialize = function () {
            
            var _this = this;
            this.gpio.setMode('mode_bcm');

            this.gpio.destroy(function () {
                console.log('cleaned up gpio');
            });

            this.gpio.setup(this.accP1, this.gpio.DIR_OUT);
            this.gpio.setup(this.accP2, this.gpio.DIR_OUT);
            this.gpio.setup(this.steerP1, this.gpio.DIR_OUT);
            this.gpio.setup(this.steerP2, this.gpio.DIR_OUT);

            this.gpio.setup(this.pirSensor, this.gpio.DIR_IN, this.gpio.EDGE_BOTH);

            this.gpio.setup(this.accEN, this.gpio.DIR_OUT, function () {

                _this.gpio.write(_this.accEN, true, function (err) {
                    if (err)
                        throw err;
                    console.log('Enabled Acc');
                });
            });

            this.gpio.setup(this.steerEN, this.gpio.DIR_OUT, function () {

                _this.gpio.write(_this.steerEN, true, function (err) {
                    if (err)
                        throw err;
                    console.log('Enabled Steer');
                });
            });
        }

        this.registerPIREvents = function () {

            var _this = this;

            this.gpio.on('change', function (channel, value) {
                if(value){

                    _this.acc_end();
                    _this.socket.emit('pir','Person Detected');
                }
                else{

                    _this.socket.emit('pir', 'We are Clear!');
                }

                console.log('Channel ' + channel + ' value is now ' + value);
            });
        }

        // exec('echo "Hello world" | festival --tts', function(code, stdout, stderr) {
        //     console.log('Exit code:', code);
        //     console.log('Program output:', stdout);
        //     console.log('Program stderr:', stderr);
        // });

        this.fwd = function () {

            console.log('Forward!!');

            this.gpio.write(this.accP1, true, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });

            this.gpio.write(this.accP2, false, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });
            
        }

        this.revr = function () {

            console.log('Reverse!!');

            this.gpio.write(this.accP1, false, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });
            this.gpio.write(this.accP2, true, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });
        }

        this.left = function () {
            console.log('Left!!');
            this.gpio.write(this.steerP1, true, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });
            this.gpio.write(this.steerP2, false, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });
        }

        this.right = function () {
            console.log('Right!!');
            this.gpio.write(this.steerP1, false, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });
            this.gpio.write(this.steerP2, true, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });
        }

        this.acc_end = function () {
            console.log('End Acc!!');
            this.gpio.write(this.accP1, false, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });
            this.gpio.write(this.accP2, false, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });
        }

        this.steer_end = function () {

            console.log('End Steer!!');
            this.gpio.write(this.steerP1, false, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });
            this.gpio.write(this.steerP2, false, function (err) {
                if (err)
                    throw err;
                console.log('Written to pin');
            });

        }

        this.main = function (data) {
            
            switch (data) {
                case 'up':
                    this.fwd();
                    break;
                case 'down':
                    this.revr();
                    break;
                case 'left':
                    this.left();
                    break;
                case 'right':
                    this.right();
                    break;
                case 'acc_end':
                    this.acc_end();
                    break;
                case 'steer_end':
                    this.steer_end();
                    break;
                default:
                    break;
            }
        }
    }

module.exports = myApp;

