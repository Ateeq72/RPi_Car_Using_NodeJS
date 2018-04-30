var gpio = require('rpi-gpio');
var accP1 = 23;
var accP2 = 24;
var steerP1 = 17;
var steerP2 = 27;

gpio.setMode('mode_bcm');

module.exports = {

    main : function (data) {

        switch (data){
            case 'start' :
                this.start();
                break;

            case 'up' :
                this.fwd();
                break;

            case 'down' :
                this.revr();
                break;

            case 'left' :
                this.left();
                break;

            case 'right' :
                this.right();
                break;

            case 'end' :
                this.end();
                break;

            default:
                this.end();
                break;
        }
    },

    fwd : function(){
        console.log('Forward!!');

        gpio.write(accP1, true, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });
        gpio.write(accP2, false, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });

        
    },

    revr : function () {
        console.log('Reverse!!');

        gpio.write(accP1, false, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });
        gpio.write(accP2, true, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });
    },

    left : function () {
        console.log('Left!!');

        gpio.write(steerP1, true, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });
        gpio.write(steerP2, false, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });
    },

    right : function () {
        console.log('Right!!');

        gpio.write(steerP1, false, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });
        gpio.write(steerP2, true, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });
    },

    start : function () {
        console.log('Start!!');

        gpio.setup(accP1, gpio.DIR_OUT);
        gpio.setup(accP2, gpio.DIR_OUT);
        gpio.setup(steerP1, gpio.DIR_OUT);
        gpio.setup(steerP2, gpio.DIR_OUT);

    },

    end : function () {
        console.log('End!!');

        gpio.destroy(function() {
            console.log('All pins unexported');
        });
    }
};
