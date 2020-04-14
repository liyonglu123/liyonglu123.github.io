import React, { useState, useEffect } from "react"

const MouseTracker: React.FC = () => {
    const [position, setPosition] = useState({x: 0, y: 0})
    // 有始有终 清楚不需要的 effect
    useEffect(() => {
        console.log("add effect", position.x)
        const updateMouse = (e: MouseEvent) => {
            console.log("inner")
            setPosition({x:e.clientX, y: e.clientY})
        }
        document.addEventListener("click", updateMouse)
        return ()=> {
            console.log("remove effect", position.x)
            document.removeEventListener("click", updateMouse)
        }
    }, [])
    console.log("before render", position.x)
    return(
        <h1>X: { position.x }, Y: {position.y}</h1>
    )
}

export default MouseTracker