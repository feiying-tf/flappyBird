(function (w) {
    /**
     * 天空背景构造函数
     * @param ctx
     * @param obj 背景对象
     * @param speed 移动的速度
     * @constructor
     */
    function Sky (ctx, obj, speed) {
        Sky.len++;
        this.ctx = ctx;
        this.width = obj.width;
        this.height = obj.height;
        this.x = (Sky.len-1) * this.width;
        this.y = 0;
        this.obj = obj;
        this.speed = speed;
    }
    Sky.len = 0;
    Sky.prototype = {
        constructor : Sky,
        draw : function () {
            var self = this;
            // this.ctx.clearRect(0, 0, cvs.width, cvs.height);
            this.ctx.drawImage(self.obj, self.x, self.y, self.width, self.height);
        },
        update : function () {
            this.x = this.x - this.speed;
            if (this.x <= -this.width) {
                this.x = this.x + this.width * Sky.len;
            }
        }
    }

    //工厂模式
    w.getSky = function (ctx, obj, speed) {
        return new Sky(ctx, obj, speed);
    }
}(window))
