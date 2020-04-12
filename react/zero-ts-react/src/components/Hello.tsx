import * as React from "react"
interface IProps {
    message: string
}
console.log(React)

const Hello: React.FunctionComponent<IProps> = (props) => {
    return (
        <h2>{ props.message }</h2>
    )
}
export default Hello