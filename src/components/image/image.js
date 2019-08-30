import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { observable } from "mobx";
import ClassNames from "classnames";
import "./image.scss";

/*
* Use this component while rendering any image to get the loading and error state.
* */
@observer
class Image extends Component {

  /*
  * Prop types
  * */
  static propTypes = {
    alt: PropTypes.string,
    fallbackElement: PropTypes.element,
    src: PropTypes.string
  };

  /*
  * Default Props
  * */
  static defaultProps = {
    alt: "Sorry, No Image Found",
    fallbackElement: <div className="image__fallbackElement" />
  };

  /*
  * Observables
  * */
  @observable loading = true;

  /*
   * Handles image onLoad
   * */
  onLoadHandler = () => {
    this.loading = false;
  };

  /*
   * Handles any error occurred during image rendering.
   * */
  onErrorHandler = () => {
    this.loading = false;
  };

  render() {
    const imgClasses = ClassNames("image__imageTag",{
      "image__imageTag--active": !this.loading,
    }, this.props.classNames);
    return (
      <div className="image">
        <img
          onLoad={this.onLoadHandler.bind(this)}
          onError={this.onErrorHandler.bind(this)}
          className={imgClasses}
          src={this.props.src}
          alt={this.props.alt}
        />
      </div>
    );
  }
}

export default Image;
