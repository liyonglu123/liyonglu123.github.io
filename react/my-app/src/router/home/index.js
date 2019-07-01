import React from 'react';
import Http  from '../../utils/request'
const arr = [];
class Home extends React.Component{
    // 生命周期
    componentDidMount() {
        // 发送请求
        // Http.get("http://localhost:3000/api").then((res)=> {
        //     console.log(res.data);
        // }).catch((err)=> {
        //     console.log(err);
        // })

    };
    // { arr.map(item => <li key={item._id}>{item.username}-{item.password}-{item.age}</li>)}
    render() {
       return (
        <div>
            <ul>
                <li>飞飞</li>
            </ul>
        </div>
       )

    }
}
export default Home