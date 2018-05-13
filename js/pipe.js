(function (w) {
    /**
     * 管道构造函数
     * @param ctx
     * @param pipeDown 下面的管道
     * @param pipeUp 上面的管道
     * @param space 上下管道中间的距离
     * @param landHeight 地面的高度
     * @param speed 移动的速度
     * @constructor
     */
    function Pipe (ctx, pipeUp, pipeDown, space, landHeight, speed) {
        Pipe.len++;
        this.ctx = ctx;
        this.width = pipeDown.width;
        this.height = pipeDown.height;
        // Pipe.distance = (cvs.width-(Pipe.len * this.width))/Pipe.len;
        this.downX = (Pipe.len-1) * this.width * 3 + 300 ;
        this.upX = (Pipe.len-1) * this.width * 3 + 300 ;

        //管道的最低为100
        this.minHeight = 100;
        this.pipeDown = pipeDown;
        this.pipeUp = pipeUp;
        this.speed = speed;
        this.space = space;
        this.landHeight = landHeight;
        this._init();

    }
    Pipe.len = 0;
    // Pipe.distance = 0;
    Pipe.prototype = {
        constructor : Pipe,
        _init : function () {
            //管道的最大高度
            var maxHeight = this.ctx.canvas.height - this.space - this.landHeight - this.minHeight;
            //生成随机的高度
            var actHeight = maxHeight * Math.random();
            actHeight = actHeight > 100?actHeight:100;
            this.upY = -(this.height - actHeight);
            this.downY = actHeight + this.space;
        },
        draw : function () {
            // console.log("我是管道");
            var self = this;

            // this.ctx.clearRect(0, 0, cvs.width, cvs.height);
            this.ctx.drawImage(self.pipeUp, self.upX, self.upY, self.width, self.height);
            this.ctx.drawImage(self.pipeDown, self.downX, self.downY, self.width, self.height);

            //通过新绘制的管道，绘制路径
            this.ctx.strokeStyle = "red";
            this.ctx.rect(self.upX, self.upY, self.width, self.height);
            this.ctx.rect(self.downX, self.downY, self.width, self.height);
            // this.ctx.stroke();
        },
        update : function () {
            this.downX = this.downX - this.speed;
            this.upX = this.upX - this.speed;
            if (this.downX <= -this.width) {
                this.downX = this.downX + this.width * 3 * Pipe.len;
                this.upX = this.upX + this.width * 3 * Pipe.len;

                //管道的最大高度
                var maxHeight = this.ctx.canvas.height - this.space - this.landHeight - this.minHeight;
                //生成随机的高度
                var actHeight = maxHeight * Math.random();
                actHeight = actHeight > 100?actHeight:100;
                this.upY = -(this.height - actHeight);
                this.downY = actHeight + this.space;
            }
        }
    }

    //工厂模式
    w.getPipe = function (ctx, pipeUp, pipeDown, space, landHeight, speed) {
        return new Pipe(ctx, pipeUp, pipeDown, space, landHeight, speed);
    }
}(window))
