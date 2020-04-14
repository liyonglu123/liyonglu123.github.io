import { useState, useEffect } from "react"
import axios from "axios"

// 必须是use开头的   组件之间的调用是独立的
// 自定义 hooks 实现loading

const useURLLoader = (url: string, deps: any[] = []) => {
    // 类型断言
    // const { data, setData } = useState<any>(null)
    // const { loading, setLoading } = useState(false)
    // useEffect(() => {
    //     setLoading(true)
    //     axios.get(url).then(result => {
    //         // setData(result.data)
    //         setLoading(false)
        
    //     })
    // }, deps)
    // return [loading]
}
export default useURLLoader