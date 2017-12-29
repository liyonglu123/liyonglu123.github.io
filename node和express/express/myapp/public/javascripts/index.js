
// $('#test').html(template('testTmp', data));
// var list = document.getElementById('test');
// list.innerHTML = template('testTmp', [1,2,4]);

fetch("javascripts/index.json").then((res) => {
    if (res.ok) {
        res.json().then(function (data) {
            console.log(data);
        });
    }
})