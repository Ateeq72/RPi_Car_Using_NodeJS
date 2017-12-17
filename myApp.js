var gpio = require('gpio');
var accP1 = 23;
var accP2 = 24;
var steerP1 = 17;
var steerP2 = 27;

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
    },

    revr : function () {
        console.log('Reverse!!');
    },

    left : function () {
        console.log('Left!!');
    },

    right : function () {
        console.log('Right!!');
    },

    start : function () {
        console.log('Start!!');
    },

    end : function () {
        console.log('End!!');
    }
};
