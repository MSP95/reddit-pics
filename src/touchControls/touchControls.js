import React from "react";
import PropTypes from "prop-types";

class TouchControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startX: 0,
      endX: 0,
      endY: 0,
      startY: 0
    };
  }

  static propTypes = {
    onSwipeDown: PropTypes.func,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
    onSwipeUp: PropTypes.func
  };

  static defaultProps = {
    onSwipeDown: () => {},
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
    onSwipeUp: () => {}
  };
  onTouchCancelHandler(e) {
    console.log("cancel: :->", e.changedTouches[0]);
    this.setState({
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    });
  }
  onTouchEndHandler(e) {
    const clientX = e.changedTouches[0] ? e.changedTouches[0].clientX : 0;
    const clientY = e.changedTouches[0] ? e.changedTouches[0].clientY : 0;
    console.log('clientX :->', clientX);
    
    this.setState({
      endX: clientX,
      endY: clientY
    }, ()=> {
      const { startX, startY, endX, endY } = this.state;
      this.determineGesture(startX, startY, endX, endY);
    });

  }
  onTouchMoveHandler(e) {
    // console.log('move :->', e.changedTouches[0]);
  }
  onTouchStartHandler(e) {
    const clientX = e.changedTouches[0] ? e.changedTouches[0].clientX : 0;
    const clientY = e.changedTouches[0] ? e.changedTouches[0].clientY : 0;
    this.setState({
      startX: clientX,
      startY: clientY
    });
  }

  render() {
    return (
      <div
        onTouchCancel={this.onTouchCancelHandler.bind(this)}
        onTouchEnd={this.onTouchEndHandler.bind(this)}
        onTouchMove={this.onTouchMoveHandler.bind(this)}
        onTouchStart={this.onTouchStartHandler.bind(this)}
      >
        {this.props.children}
      </div>
    );
  }

  determineGesture(startX, startY, endX) {
    if (startX - endX > 100) {
        this.props.onSwipeLeft();
    } else if (endX - startX > 100) {
        this.props.onSwipeRight();
    }
    this.setState({
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    });
  }
}

export default TouchControls;
