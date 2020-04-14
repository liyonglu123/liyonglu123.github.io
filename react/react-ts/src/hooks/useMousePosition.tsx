import React, { useState, useEffect } from "react"

// 必须是use开头的   组件之间的调用是独立的
const useMousePosition = () => {
    const [position, setPosition] = useState({x: 0, y: 0})
    useEffect(() => {
        console.log("add effect", position.x)
        const updateMouse = (e: MouseEvent) => {
            setPosition({x:e.clientX, y: e.clientY})
        }
        document.addEventListener("mousemove", updateMouse)
        return ()=> {
            console.log("remove effect", position.x)
            document.removeEventListener("mousemove", updateMouse)
        }
    }, [])
    return position
}
export default useMousePosition