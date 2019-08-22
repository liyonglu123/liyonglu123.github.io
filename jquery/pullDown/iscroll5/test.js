var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset, _maxScrollY;

var generatedCount = 0;
//初始状态，加载数据 
function loadAction() {
    var el, li;
    el = document.getElementById('thelist');
    for (i = 0; i < 10; i++) {
        li = document.createElement('li');
        li.innerText = '初始数据--' + (++generatedCount);
        el.appendChild(li, el.childNodes[0]);
    }
    myScroll.refresh();
}

function pullDownAction() {
    setTimeout(function () { // <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        el = document.querySelector('#scroller ul');

        for (i = 0; i < 10; i++) {
            li = document.createElement('li');
            li.innerHTML = '(Pull down) Generated row ' + (++generatedCount); //Firefox  does not suppose innerText, use innerHTML instead.
            el.insertBefore(li, el.childNodes[0]);
        }
        if (myScroll) {
            myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)
        }
    }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction() {
    setTimeout(function () { // <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        el = document.querySelector('#scroller ul');

        for (i = 0; i < 10; i++) {
            li = document.createElement('li');
            li.innerHTML = '(Pull up) Generated row ' + (++generatedCount); //Firefox  does not suppose innerText, use innerHTML instead.
            el.appendChild(li, el.childNodes[0]);
        }
        if (myScroll) {
            myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)
        }
    }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
    pullDownEl = document.querySelector('#pullDown');
    if (pullDownEl) {
        pullDownOffset = pullDownEl.offsetHeight;
    } else {
        pullDownOffset = 0;
    }
    pullUpEl = document.querySelector('#pullUp');
    if (pullUpEl) {
        pullUpOffset = pullUpEl.offsetHeight;
    } else {
        pullUpOffset = 0;
    }

    console.log('pullDownOffset:' + pullDownOffset);
    console.log('pullUpOffset:' + pullUpOffset);

    //Options of IScroll
    var myOptions = {
        mouseWheel: true,
        scrollbars: true,
        fadeScrollbars: true,
        probeType: 1,
        startY: -pullDownOffset
    };
    myScroll = new IScroll('#wrapper', myOptions);
    console.log('maxScrollY-1:' + myScroll.maxScrollY);
    _maxScrollY = myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
    console.log('maxScrollY-2:' + myScroll.maxScrollY);

    var isScrolling = false;

    //Event: scrollStart
    myScroll.on("scrollStart", function () {
        if (this.y == this.startY) {
            isScrolling = true;
        }
        console.log('start-y:' + this.y);
    });

    //Event: scroll
    myScroll.on('scroll', function () {
        if (this.y >= 5 && pullDownEl && !pullDownEl.className.match('flip')) {
            pullDownEl.className = 'flip';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh';
            //this.minScrollY = 0;
        } else if (this.y < 5 && pullDownEl && pullDownEl.className.match('flip')) {
            pullDownEl.className = '';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh';
            //this.minScrollY = -pullDownOffset;
        } else if (this.y <= (_maxScrollY - pullUpOffset) && pullUpEl && !pullUpEl.className.match('flip')) {
            pullUpEl.className = 'flip';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh';
            //this.maxScrollY = this.maxScrollY;
            this.maxScrollY = this.maxScrollY - pullUpOffset;
        } else if (this.y > (_maxScrollY - pullUpOffset) && pullUpEl && pullUpEl.className.match('flip')) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more';
            //this.maxScrollY = pullUpOffset;
            this.maxScrollY = this.maxScrollY + pullUpOffset;
        }

        console.log('y:' + this.y);
    });

    //Event: scrollEnd
    myScroll.on("scrollEnd", function () {
        console.log('scroll end');
        console.log('directionY:' + this.directionY);
        console.log('y1:' + this.y);
        console.log('maxScrollY-3:' + this.maxScrollY);
        if (pullDownEl && !pullDownEl.className.match('flip') && this.y > this.options.startY) {
            console.log('resume');
            this.scrollTo(0, this.options.startY, 800);
        }
        else if (pullDownEl && pullDownEl.className.match('flip')) {
            pullDownEl.className = 'loading';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
            // Execute custom function (ajax call?)
            if (isScrolling) {
                console.log('before pull down action:' + this.y);
                pullDownAction();
                console.log('after pull down action:' + this.y);
            }
        }
        else if (pullUpEl && pullUpEl.className.match('flip')) {
            console.log('pull up loading');
            pullUpEl.className = 'loading';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
            // Execute custom function (ajax call?)
            if (isScrolling) {
                console.log('before pull up action:' + this.y);
                pullUpAction();
                console.log('after pull up action:' + this.y);
            }
        }
        isScrolling = false;
    });

    //Event: refresh
    myScroll.on("refresh", function () {

        console.log('maxScrollY-4:' + this.maxScrollY);
        _maxScrollY = this.maxScrollY = this.maxScrollY + pullUpOffset;
        console.log('maxScrollY-5:' + this.maxScrollY);

        if (pullDownEl && pullDownEl.className.match('loading')) {
            pullDownEl.className = '';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh';
            this.scrollTo(0, this.options.startY, 0);
        } else if (pullUpEl && pullUpEl.className.match('loading')) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more';
            this.scrollTo(0, this.maxScrollY, 0);
        }

        console.log('refresh finished!');
    });
    // 初始化数据
    loadAction();
    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 500);

}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);