import React, { Component } from "react";
import "./swiper.scss";
import TouchControls from "./touchControls/touchControls";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

class Swiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComponent: 0,
      childCount: props.children.length
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      childCount: nextProps.children.length
    };
  }

  onKeyPressed(e) {
    if (e.key === "ArrowRight") {
      this.next();
    } else if (e.key === "ArrowLeft") {
      this.previous();
    }
  }

  next() {
    this.setState({
      currentComponent:
        this.state.childCount - 1 > this.state.currentComponent
          ? this.state.currentComponent + 1
          : 0
    });
  }

  previous() {
    this.setState({
      currentComponent:
        0 < this.state.currentComponent ? this.state.currentComponent - 1 : 0
    });
  }
  render() {
    return (
      <TouchControls
        onSwipeRight={this.previous.bind(this)}
        onSwipeLeft={this.next.bind(this)}
      >
        <div
          className="swiper"
          onKeyDown={e => this.onKeyPressed(e)}
          tabIndex={0}
        >
          {this.state.childCount > 0
            ? this.props.children[this.state.currentComponent]
            : null}
        </div>
      </TouchControls>
    );
  }
}

export default Swiper;
