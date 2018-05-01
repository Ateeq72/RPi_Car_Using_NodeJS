var gpio = require('rpi-gpio');
var exec = require('child_process').exec;

var accP1 = 23;
var accP2 = 24;
var accEN = 25;

var steerP1 = 17;
var steerP2 = 27;
var steerEN = 22;

var pirSensor = 21;

gpio.setMode('mode_bcm');

gpio.destroy(function () {
    console.log('cleaned up gpio');
});

gpio.setup(accP1, gpio.DIR_OUT);
gpio.setup(accP2, gpio.DIR_OUT);

gpio.setup(steerP1, gpio.DIR_OUT);
gpio.setup(steerP2, gpio.DIR_OUT);

gpio.on('change', function(channel, value) {

    if(value){
        io.emit('pir',function () {
            return {data : 'person detected'};
        });
    }
    else{
        io.emit('pir',function () {
            return {data : 'we are clear!'};
        });
    }

    console.log('Channel ' + channel + ' value is now ' + value);
});

gpio.setup(pirSensor, gpio.DIR_IN, gpio.EDGE_BOTH);

gpio.setup(accEN, gpio.DIR_OUT,function () {
    gpio.write(accEN, true, function(err) {
        if (err) throw err;
        console.log('Enabled Acc');
    });
});
gpio.setup(steerEN, gpio.DIR_OUT, function () {
    gpio.write(steerEN, true, function(err) {
        if (err) throw err;
        console.log('Enabled Steer');
    });
});

// exec('echo "Hello world" | festival --tts', function(code, stdout, stderr) {
//     console.log('Exit code:', code);
//     console.log('Program output:', stdout);
//     console.log('Program stderr:', stderr);
// });

module.exports = {

    main : function (data, io) {

        switch (data){
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

            case 'acc_end' :
                this.acc_end();
                break;

            case 'steer_end' :
                this.steer_end();
                break;

            default:               
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

    acc_end : function () {
        console.log('End Acc!!');

        gpio.write(accP1, false, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });
        gpio.write(accP2, false, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });        
    },

    steer_end : function () {
        console.log('End Steer!!');

        gpio.write(steerP1, false, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });
        gpio.write(steerP2, false, function(err) {
            if (err) throw err;
            console.log('Written to pin');
        });

    }
};
