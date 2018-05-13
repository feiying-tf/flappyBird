(function (w) {
    /**
     * 大地构造函数
     * @param ctx
     * @param obj 背景对象
     * @param speed 移动的速度
     * @constructor
     */
    function Land (ctx, obj, speed) {
        Land.len++;
        this.ctx = ctx;
        this.width = obj.width;
        this.height = obj.height;
        this.x = (Land.len-1) * this.width;
        this.y = cvs.height - this.height;
        this.obj = obj;
        this.speed = speed;
    }
    Land.len = 0;
    Land.prototype = {
        constructor : Land,
        draw : function () {
            var self = this;
            // this.ctx.clearRect(0, 0, cvs.width, cvs.height);
            this.ctx.drawImage(self.obj, self.x, self.y, self.width, self.height);
        },
        update : function () {
            this.x = this.x - this.speed;
            if (this.x <= -this.width) {
                this.x = this.x + this.width * Land.len;
            }
        }
    }

    //工厂模式
    w.getLand = function (ctx, obj, speed) {
        return new Land(ctx, obj, speed);
    }
}(window))
