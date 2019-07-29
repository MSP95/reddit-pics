import React, { Component } from "react";
import "./swiper.scss";

class Swiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentComponent: 0,
            childCount: props.children.length
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            childCount: nextProps.children.length
        });
    }

    swipe(e, fromKey) {
        console.log(e);
        console.log(fromKey);
        this.setState({
            currentComponent: this.state.childCount-1 > this.state.currentComponent? this.state.currentComponent+1:0,
        });
    }
    onKeyPressed(e) {
        console.log(e.key);
        if (e.key === 'ArrowRight') {
            this.setState({
                currentComponent: this.state.childCount-1 > this.state.currentComponent? this.state.currentComponent+1:0,
            });
        } else if (e.key === 'ArrowLeft') {
            this.setState({
                currentComponent: 0 < this.state.currentComponent? this.state.currentComponent-1:0,
            });
        }

    }
    render() {
        return (
            <div className="swiper" onClick={this.swipe.bind(this, true)}  onKeyDown={(e) => this.onKeyPressed(e)} tabIndex={0}>
                {this.state.childCount > 0 ? this.props.children[this.state.currentComponent]: null}
            </div>
        );
    }
}

export default Swiper;
