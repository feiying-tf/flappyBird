var until =  {
    /**
     * 图片加载完毕再执行
     * @param data 一个对象，包含很多路径
     * @param fn 回调函数，当图片加载完毕之后执行
     * @constructor
     */
    loadImage: function (data, fn) {
        //遍历data，遍历的同时创建新的图片对象

        //data对象属性的数量
        var number = 0;

        //加载完成的数量
        var loadNum = 0;

        //定义一个对象，用来存放最终的图片对象
        var obj = {};
        for (var kkk in data) {
            number++;
            var img = new Image();
            img.onload = function () {
                //每次加载完毕后，loadNum就加1
                loadNum++;
                //当图片加载完毕以后执行里面的程序
                if (loadNum >= number) {
                    fn(obj);
                }
            }
            img.src = data[kkk];
            obj[kkk] = img;
        }
    }
}

