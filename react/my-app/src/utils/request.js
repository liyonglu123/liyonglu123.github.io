let config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
    },
    mode: "no-cors"
}
class Http {
    // get方式
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url, config)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))

        })
    };

    // post方式
    post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err))

        })
    };


    //put 修改
    put(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err))

        })
    };
    //delete
    delete(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => resolve('数据删除成功!'))
                .catch(err => reject(err))
        })
    }
};
export default new Http(); //ES6导出