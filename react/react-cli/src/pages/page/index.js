import style from  './index.css';
import pic from 'images/1.jpg'
import React, {PureComponent}  from 'react';
export default class Page extends PureComponent {
    render() {
        return (<div className={style["page-box"]}>
            this is page~
            <img src={pic}/>
        </div>)
    }
}
