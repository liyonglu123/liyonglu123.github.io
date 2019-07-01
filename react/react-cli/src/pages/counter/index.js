import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from 'actions/counter';
class Counter extends PureComponent {
    render() {
        return (
            <div>
                <div>当前计数为{this.props.count}</div>
                <button onClick={() => this.props.increment()}>自增
                </button>
                <button onClick={() => this.props.decrement()}>自减
                </button>
                <button onClick={() => this.props.reset()}>重置
                </button>
            </div>
        )
    }
}
// react-redux提供了一个方法connect。
// connect主要有两个参数，一个mapStateToProps,就是把redux的state，转为组件的Props，还有一个参数是mapDispatchToprops,把发射actions的方法，转为Props属性函数。

export default connect(({counter}) => counter, dispatch => ({
    increment: () => {
        dispatch(increment())
    },
    decrement: () => {
        dispatch(decrement())
    },
    reset: () => {
        dispatch(reset())
    }
}))(Counter);
