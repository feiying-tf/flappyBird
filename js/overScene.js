(function (w) {

    /**
     * 游戏结束构造函数
     * @param ctx
     * @constructor
     */
    function OverScene(ctx) {
        this.ctx = ctx;
    }
    OverScene.prototype = {
        constructor: OverScene,

        draw: function (time, setTime) {

            var totalTime = parseInt(time * setTime / 1000);

            var hourS = parseInt(totalTime / 3600 / 10);
            var hourG = parseInt(totalTime / 3600 % 10);

            var minuteS = parseInt(totalTime % 3600 / 60 / 10);
            var minuteG = parseInt(totalTime % 3600 / 60 % 10);

            var secondS = parseInt(totalTime % 60 / 10);
            var secondG = parseInt(totalTime % 60 % 10);

            var self = this;
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(100, 100, 100, .6)';
            this.ctx.fill();
            this.ctx.fillRect(0, 0, cvs.width, cvs.height);
            this.ctx.font = "900 50px/1em 'microsoft yahei'";
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = 'red';
            this.ctx.fillText('GAME OVER！', cvs.width / 2, cvs.height / 2);
            this.ctx.font = "900 14px/1em 'microsoft yahei'";
            this.ctx.fillStyle = '#eee';
            this.ctx.fillText('您坚持了' + hourS + '' + hourG + ':' + minuteS + '' + minuteG + ':' + secondS + '' + secondG + '', cvs.width / 10 * 9, cvs.height / 10);
            return;
        }
    }
        w.getOverScence = function (ctx) {
            return new OverScene(ctx);
    }
}(window))