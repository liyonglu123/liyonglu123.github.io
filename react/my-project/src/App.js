import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NameCard from "./compontents/NameCard"
import LikesButton from "./compontents/LikesButton"
import DigitalClock from "./compontents/DigitalClock"
import CommentBox from "./compontents/CommentBox"
import CommentList from "./compontents/CommentList"
import ThemeBar from "./compontents/ThemeBar"


import ThemeContext from "./theme-context"
// ThemeContext.Provider： 传入
// 
const themes = {
 light: {
  className: "btn btn-primary",
  bgColor: "#eeeeee",
  color: "#000"
 },
 dark: {
  className: "btn btn-light",
  bgColor: "#222",
  color: "#fff"
 }
}
// context 
class App extends Component {
  constructor(props) {
    super(props)
    this.state= {
      theme: "light"
    }
  }
  // this.changeTheme(arg) 直接传参数 出现 ReactJS：最大更新深度超出错误(ReactJS: Maximum update depth exceeded error)
  changeTheme(theme) {
    this.setState({
      theme
    })
  }
  render() {
    return (
      <ThemeContext.Provider value={ themes[this.state.theme] }>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1>React</h1>
          <a href="#theme-switcher"
            className="btn btn-light"
            onClick={ ()=>{this.changeTheme("light")} }>
              浅色主题
          </a>
          <a href="#theme-switcher"
            className="btn btn-secondary"
            onClick={ ()=>{this.changeTheme("dark")} }>
              深色主题
          </a>
          <ThemeBar/>
      </div>
      </ThemeContext.Provider>
    );
  }
}
// 留言板
// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       comments: ["first"]
//     }
//     this.addComment = this.addComment.bind(this)
//   }
//   addComment(comment) {
//     this.setState({
//       comments: [...this.state.comments , comment]
//     })
//   }
//   render() {
//     const tags = ["吃法", "睡觉"]
//     const { comments } = this.state
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//         </header>
//          <NameCard name="张三" number={11111} tags={ tags }/>
//           <LikesButton/>
//           <DigitalClock/>
//           <CommentList comments={ comments }/>
//           <CommentBox 
//             commentsLength={ comments.length }
//             onAddComment= { this.addComment }/>
//       </div>
//     );
//   }
// }
// function App() {
//   const tags = ["吃法", "睡觉"]
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//       </header>
//        <NameCard name="张三" number={11111} tags={ tags }/>
//         <LikesButton/>
//         <DigitalClock/>
//         <CommentBox/>
//     </div>
//   );
// }

export default App;
