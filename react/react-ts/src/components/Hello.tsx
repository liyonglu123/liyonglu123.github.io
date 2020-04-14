import React from "react"

interface IProps {
    message: string
}
const Hello: React.FC<IProps> = (props) => {
    return(
        <h1>{props.message}</h1>
    )
}

export default Hello