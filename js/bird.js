(function (w) {
    /**
     * 小鸟构造函数
     * @param ctx
     * @param obj 小鸟对象
     * @param widthFrame 水平的帧数
     * @param heightFrame 垂直的帧数
     * @param x 开始的x坐标
     * @param y 开始的y坐标
     * @param speed 移动的速度
     * @constructor
     */
    function Bird (ctx, obj, widthFrame, heightFrame, x, y, speed) {
        this.ctx = ctx;
        this.obj = obj;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = this.obj.width/this.widthFrame;
        this.height = this.obj.height/this.heightFrame;
        this.acceleration = 0.5;
        this._bind();
    }
    Bird.len = 0;
    Bird.prototype = {
        constructor : Bird,

        _bind : function () {
            var self = this;
            //为画布添加点击事件
            this.ctx.canvas.addEventListener('click', function () {
                self.speed = -5;
            })
        },

        draw : function () {
            var self = this;
            Bird.len++;
            if(Bird.len > 3) {
                Bird.len = 1;
            }
            /*控制小鸟的朝向
            * 首先将坐标轴移到小鸟身体的正中间
            *根据速度speed控制小鸟的旋转  rotate = speed * 5
            *判断设置角度的临界值
            * */
            var birdRotate = this.speed * 5;
            //判断设置临界值
            birdRotate = birdRotate > 45?45: birdRotate;
            birdRotate = birdRotate < -45?-45 : birdRotate;
            this.ctx.save();
            this.ctx.translate(this.x + this.height / 2, this.y + this.width / 2);
            this.ctx.rotate((Math.PI/180) * birdRotate);
            this.ctx.drawImage(this.obj,
                this.width * (Bird.len - 1), 0, this.width, this.height,
                -this.width/2, -this.height/2, this.width, this.height);
            this.ctx.restore();

        },
        update : function () {
            //加速度为0.5
            this.speed = this.speed + this.acceleration;
            this.y = this.y + this.speed;
        }
    }

    // 存放小鸟对象
    var bird = null;
    //单利模式
    w.getBird = function (ctx, obj, widthFrame, heightFrame, x, y, speed) {
        if (!bird) {
            bird = new Bird(ctx, obj, widthFrame, heightFrame, x, y, speed);
        }
        return bird ;
    }
}(window))
