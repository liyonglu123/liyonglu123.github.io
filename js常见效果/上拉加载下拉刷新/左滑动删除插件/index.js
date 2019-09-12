var swipedeletecontent = document.querySelectorAll(".swipe-delete-element")[0];
var sa = swipeDelete(swipedeletecontent, {
    direction: 'left',
    deleteFn: function (e) {
        alert(this.innerHTML)
        console.log(e.target);
    }
})



var swipedeletecontent1 = document.querySelectorAll(".swipe-delete-element")[1];
var sa1 = swipeDelete(swipedeletecontent1, {

    deleteFn: function (e) {
        alert(this.innerHTML);
        console.log(e.target);

    }
})



var swipedeletecontent2 = document.querySelectorAll(".swipe-delete-element")[2];
var sa2 = swipeDelete(swipedeletecontent2, {
    direction: 'right',
    deleteFn: function (e) {
        alert(this.innerHTML);
        console.log(e.target);

    }
})
//console.log(sa2.swipeOpen())

var swipedeletecontent3 = document.querySelectorAll(".swipe-delete-element")[3];
var sa3 = swipeDelete(swipedeletecontent3, {
    direction: 'right',
    deleteFn: function (e) {
        alert(this.innerHTML);
        console.log(e.target);

    }
})
//console.log(sa3);





var swipedeletecontent4 = document.querySelectorAll(".swipe-delete-element")[4];
var sa4 = swipeDelete(swipedeletecontent4, {
    distance: 160,
    direction: 'left',
    deleteFn: function (e) {
        //console.log(e.target);

        var that = this;

        if (that.className == "on1") {
            alert("on1" + that.innerHTML)
        } else if (that.className == "on2") {
            alert("on2" + that.innerHTML)
        }
    }
})
//console.log(sa4.swipeOpen())



var swipedeletecontent5 = document.querySelectorAll(".swipe-delete-element")[5];
var sa5 = new swipeDelete(swipedeletecontent5, {
    distance: 160,
    deleteBtn: '.swipe-delete-btn2',
    deleteClose: false,
    //direction:'left',
    touchStart: function (e) {
        console.log("sa6 touchStart" + this.innerHTML);
        //console.log(this.innerHTML==e.target.innerHTML);
    },
    opened: function (e) {
        //console.log("sa6 opened");
        console.log("sa6 opened" + this.innerHTML);
    },
    closed: function (e) {
        //console.log("sa6 closed");
        console.log("sa6 closed" + this.innerHTML);
    },
    deleteFn: function (e) {
        var that = this;
        console.log(e.target.parentNode);
        if (that.className == "on1") {
            alert("5on11" + that.innerHTML + '不 可以关闭');

        } else if (that.className == "on2") {
            alert("5on22" + that.innerHTML + '可以关闭');
            return true; //关闭
        }
    }
})
sa5.swipeOpen();
//console.log(sa5)

document.getElementById("j_opend").addEventListener("click", function () {
    var swipe5 = document.querySelector(".swipe5").querySelector(".swipe-delete-element");
    var flagOpen = swipe5.getAttribute("data-lock");

    if (flagOpen == 'false') {
        sa5.swipeOpen();
        this.innerHTML = "swipe5 关闭"
    }

    if (swipe5.getAttribute("data-lock") == 'true') {
        sa5.swipeClose();

        this.innerHTML = "swipe5打开 "
    }

})



var sa66 = new swipeDelete(".swipe-delete-element66", {
    distance: 160,
    deleteBtn: '.swipe-delete-btn2',
    deleteClose: true,
    //direction:'left',
    touchStart: function (e) {
        console.log("sa6 touchStart" + this.innerHTML);
        //console.log(this.innerHTML==e.target.innerHTML);
    },
    opened: function (e) {
        //console.log("sa6 opened");
        console.log("sa6 opened" + this.innerHTML);
    },
    closed: function (e) {
        //console.log("sa6 closed");
        console.log("sa6 closed" + this.innerHTML);
    },
    deleteFn: function (e) {
        var that = this;
        console.log(e.target.parentNode);
        if (that.className == "on1") {
            alert("6on11" + that.innerHTML);

        } else if (that.className == "on2") {
            alert("6on22" + that.innerHTML)


        }
        //console.log(this.innerHTML);

    }
})
console.log(sa66);