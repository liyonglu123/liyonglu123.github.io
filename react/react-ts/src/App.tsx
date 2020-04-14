import React, { useState } from 'react';
import logo from './logo.svg';
import LikeButton from "./components/LikeButton"
import Hello from "./components/Hello"
import MouseTracker from "./components/MouseTracker"
import useMousePosition from "./hooks/useMousePosition"

// import useURLLoader from "./hooks/useURLLoader"


import './App.css';
// context 的实例
interface ITheme {
  [key: string] : { color: string; background: string}
}

const themes: ITheme = {
  "light": {
    color: "#000",
    background: "#eee"
  },
  "dark": {
    color: "#fff",
    background: "#222"
  }
}
export const ThemeContext = React.createContext(themes.light)
// axios
interface IShowResult {
  message: string;
  status: string;
}
function App() {
  console.log(React)
  // 控制effect的执行次数
  const [show, setShow] = useState(true)
  // 自定义hooks
  const position = useMousePosition()
  // axios ---loading
  // const [ data, loading ] = useURLLoader("https://dog.ceo/api/breeds/image/random", [show])
  // const dogResult = data as IShowResult
  return (
    <div className="App">
      <ThemeContext.Provider value={ themes.dark }>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={()=> {setShow(!show)}}>刷新图片</button>
        {/* { loading ? <p>🐕读取中。。。</p>
        : <img src={dogResult && dogResult.message}/>} */}
        <h1>X: { position.x }, Y: {position.y}</h1>
        <LikeButton/>
        <Hello message="666"/>
        { show &&  <MouseTracker/>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
