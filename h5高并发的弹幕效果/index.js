(function ($) {
    function Barrager(dom) {
        this.canvas = dom.get(0);
        this.ctx = this.canvas.getContext("2d");
        this.msgs = new Array(300); //缓冲池，长度越大，屏幕上显示的就越多
        this.width = 1280; //canvas分辨率1280*720
        this.height = 720;
        this.canvas.width = this.width; //上边的两步可以省略，直接在这里赋值
        this.canvas.height = this.height;
        this.font = "30px 黑体"; //字体和字体大小
        this.ctx.font = this.font;
        //颜色数组，在绘制过程中随机从这里取出颜色
        this.colorArr = ["Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue"];
        this.interval = "";
        this.draw = function () { //绘制方法
            if (this.interval != "") return;
            var _this = this;
            this.interval = setInterval(function () { //每隔20毫秒重新绘制一次，间隔最好小于40，要不然效果就跟播放图片差不多
                //1，清除屏幕
                _this.ctx.clearRect(0, 0, _this.width, _this.height);
                _this.ctx.save();
                //2，循环缓冲区域，把没有设置Left，Top，Speed，Color先赋值，赋值的就改变left值（产生移动效果），left值小于200就会从缓冲区移除
                for (var i = 0; i < _this.msgs.length; i++) {
                    if (!(_this.msgs[i] == null || _this.msgs[i] == "" || typeof (_this.msgs[i]) == "undefined")) {
                        if (_this.msgs[i].L == null || typeof (_this.msgs[i].L) == "undefined") {
                            _this.msgs[i].L = _this.width;
                            _this.msgs[i].T = parseInt(Math.random() * 700);
                            _this.msgs[i].S = parseInt(Math.random() * (10 - 4) + 4);
                            _this.msgs[i].C = _this.colorArr[Math.floor(Math.random() * _this.colorArr.length)];
                        } else {
                            if (_this.msgs[i].L < -200) {
                                _this.msgs[i] = null;
                            } else {
                                _this.msgs[i].L = parseInt(_this.msgs[i].L - _this.msgs[i].S);
                                _this.ctx.fillStyle = _this.msgs[i].C;
                                _this.ctx.fillText(_this.msgs[i].msg, _this.msgs[i].L, _this.msgs[i].T);
                                _this.ctx.restore();
                            }
                        }
                    }
                }
            }, 20);
        };
        //添加数据，数据格式[{"msg":"nihao"}]
        this.putMsg = function (datas) { //循环缓冲区，把位置是空的装填上数据
            for (var j = 0; j < datas.length; j++) {
                for (var i = 0; i < this.msgs.length; i++) {
                    if (this.msgs[i] == null || this.msgs[i] == "" || typeof (this.msgs[i]) == "undefined") {
                        this.msgs[i] = datas[j];
                        break;
                    }
                }
            }
            this.draw();
        };
        this.clear = function () { //清除定时器，清除屏幕，清空缓冲区
            clearInterval(this.interval);
            this.interval = "";
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.save();
            for (var i = 0; i < this.msgs.length; i++) {
                this.msgs[i] = null;
            }
        };
    }

    $.fn.barrager = function (para) {
        if (typeof (para) == "string") {
            try {
                var api = $(this).data('barrager_api');
                api[para].apply(api);
            } catch (e) {}
        } else if (typeof para == 'object' || !para) {
            $this = $(this);
            if ($this.data('barrager_api') != null && $this.data('barrager_api') != '') {
                var api = $this.data('barrager_api');
                api.putMsg(para);
            } else {
                var api = new Barrager($this);
                $this.data('barrager_api', api);
                api.putMsg(para);
            }
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.slidizle');
        }
        return this;
    }
})(jQuery);