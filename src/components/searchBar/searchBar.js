import React, { Component } from "react";
import "./searchBar.scss";
import { MdClose, MdSearch } from "react-icons/md";
import {IoLogoReddit} from "react-icons/io";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

@inject("stores")
@observer
class SearchBar extends Component {
  static propTypes = {
    onSearch: PropTypes.func
  };

  static defaultProps = {
    onSearch: () => {}
  };

  onBtnClick = e => {
    const { HomePageStore } = this.props.stores;
    e.stopPropagation();
    if (HomePageStore.showBar) {
      this.props.onSearch();
    } else {
      HomePageStore.showBar = true;
    }
  };

  onCloseBtnClick = () => {
    const { HomePageStore } = this.props.stores;
    HomePageStore.resetPosts();
    HomePageStore.subReddit = "";
    HomePageStore.resetSearchInputValue();
  };

  render() {
    const { HomePageStore } = this.props.stores;
    const onChange = e => {
      HomePageStore.onChangeSearchInputValue(e.target.value);
    };

    const onKeyPress = e => {
      if (e.key === "Enter") {
        HomePageStore.resetPosts();
        this.props.onSearch();
      }
    };
    return (
      <div className="top-bar" onClick={e => e.stopPropagation()}>
        <div className="top-bar__searchBar">
          <div
            className={`top-bar__searchBar__search ${
              HomePageStore.showBar ? "active" : ""
            }`}
          >
            <input
              className="top-bar__searchBar__search__input"
              onChange={onChange}
              onKeyPress={onKeyPress}
              value={HomePageStore.searchInputValue}
              placeholder="Enter a subReddit"
            />
            <div className="btn close-btn" onClick={this.onCloseBtnClick}>
              <MdClose />{" "}
            </div>
          </div>
          <div className="btn top-bar__searchBar__search__btn " onClick={this.onBtnClick}>
            <MdSearch />
          </div>
        </div>
        <div className="top-bar__autoComplete">
            {HomePageStore.subRedditAutoComplete.map((key)=><div className="top-bar__autoComplete__item" onClick={()=>{
              HomePageStore.searchInputValue = key;
              HomePageStore.subReddit = key;
              this.props.onSearch();
              HomePageStore.subRedditAutoComplete = [];
            }}><IoLogoReddit className="redditIcon"/>r/{key}</div>)}
        </div>
      </div>
    );
  }
}

export default SearchBar;
