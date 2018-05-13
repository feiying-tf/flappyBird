(function (w) {
    function GameScene(ctx, imgObj) {
        this.ctx = ctx;
        this.imgObj = imgObj;
        // 通过一个数组存放所有生成的对象
        this.roles = [];
        this._setRoles();
        //监听者模式第一步，新建一个属性用来存放听众
        this.listeners = [];

    }
    GameScene.prototype = {
        constructor : GameScene,
        _setRoles : function () {
            //循环创建对象，然后放到数组里面
            for (var i = 0; i < 2; i++) {
                this.roles.push(getSky(ctx, this.imgObj.sky, 5));
            }

            for (var i = 0; i < 6; i++) {
                this.roles.push(getPipe(ctx, this.imgObj.pipeDown, this.imgObj.pipeUp, 100, this.imgObj.land.height, 5));
            }

            for (var i = 0; i < 4; i++) {
                this.roles.push(getLand(ctx, this.imgObj.land, 5));
            }

            this.roles.push(getBird(ctx, this.imgObj.bird, 3, 1, 10, 10, 5));
        },
        //监听者模式第二步，新建一个方法，当事件触发时，告知听众
        birdDie : function (time, setTime) {
            this.listeners.forEach(function(ele) {
                ele(time, setTime);
            })
        },
        draw : function (time, setTime) {
            var self = this;
            //由于单利模式，bird1便是返回的刚才那个创建的小鸟。
            var bird1 = getBird();
            //判断小鸟是否出现了死亡
            if(this.ctx.isPointInPath(bird1.x + bird1.width / 2, bird1.y + bird1.height / 2)
                || (bird1.y + bird1.height / 2 < 0) || (bird1.y + bird1.height / 2 > cvs.height - this.imgObj.land.height)) {
                //监听者模式执行游戏结束程序,告诉所有听众
                this.birdDie(time, setTime);
            }
            else {
                this.ctx.beginPath();
                //游戏继续
                this.roles.forEach(function(ele) {
                    ele.draw();
                    ele.update();
                })

            }
        }
    }

    w.getGameScence = function (ctx, imgObj) {
        return new GameScene(ctx, imgObj);
    }
}(window))