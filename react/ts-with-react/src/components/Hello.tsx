import React from "react"
interface IProps {
    message: string
}
// 对应的命名空间中找不到对应的信息 
const Hello: React.FunctionComponent<IProps> = (props)=> {
    
    return (
        <h2>{ props.message }</h2>
    )
}

export default Hello