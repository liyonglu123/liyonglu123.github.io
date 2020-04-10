import React, { Component } from "react"

function NameCard(props) {
    const { name, number, isHuman, tags } = props
    return (
        <div className="alert alert-success">
            <h4 className="alert-heading">{ name }</h4>
            <ul>
                <li>电话： { number }</li>
                <li>{ isHuman ? "人类" : "非人类"}</li>
                <hr/>
                <p>
                {
                    tags.map((tag, index) => (
                        <span className="badge badge-fill badge-primary" key={index}>{ tag }</span>
                    ))
                }
                </p>
            </ul>
        </div>
    )
}
// class NameCard extends Component {
//     render() {
//         const { name, number, isHuman, tags } = this.props
//         return (
//             <div className="alert alert-success">
//                 <h4 className="alert-heading">{ name }</h4>
//                 <ul>
//                     <li>电话： { number }</li>
//                     <li>{ isHuman ? "人类" : "非人类"}</li>
//                     <hr/>
//                     <p>
//                     {
//                         tags.map((tag, index) => (
//                             <span className="badge badge-fill badge-primary" key={index}>{ tag }</span>
//                         ))
//                     }
//                     </p>
//                 </ul>
//             </div>
//         )
//     }
// }
export default NameCard