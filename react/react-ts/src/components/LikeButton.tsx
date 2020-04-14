import React, { useState, useEffect, useRef, useContext } from "react"
import useMousePosition from "../hooks/useMousePosition"
import { ThemeContext } from "../App"
const LikeButton: React.FC = () => {
    // 单独拆分出来 state HOOK 方便管理
    // 第二个参数 控制effect的行为
    const [like, setLike] = useState(0)
    const [on, setOn] = useState(true)
    // 返回的是最终的值
    const likeRef = useRef(0)
    // 声明周期
    const didMountRef = useRef(false)
    // 获取dom节点 
    const domRef = useRef<HTMLInputElement>(null)
    // context 多层传值问题
    const theme = useContext(ThemeContext)
    console.log("theme===", theme)
    const style = {
        background: theme.background,
        color: theme.color
    }
    // 自定义 hooks
    const position = useMousePosition()
    useEffect(() =>{
        console.log("document title effect is running")
        document.title = `点击了${ like }次`
    }, [like, on])
    useEffect(()=> {
        if (didMountRef.current) {
            console.log("this is updated")
        } else {
            didMountRef.current = true
        }
    })
    useEffect(()=> {
        if (domRef && domRef.current) {
            domRef.current.focus()
        } 
    })

    function handleAlertClick() {
        setTimeout(() =>{
            alert("you click on " + likeRef.current)
        }, 3000)
    }
    return(
        <div>
            <input type="text" ref={ domRef }/>
             <h2>X: { position.x }, Y: {position.y}</h2>
             <button style={style} onClick={()=> {setLike(likeRef.current++)}}>
            { like } 👍
        </button>
            <button onClick={()=> {setOn(!on)}}>
           {on ? "ON": "OFF"}
        </button>
        <button onClick={handleAlertClick}>
        alert!
        </button>

        
        </div>
       
    )
}
export default LikeButton