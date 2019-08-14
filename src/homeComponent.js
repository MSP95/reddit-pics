import React, { Component } from "react";
import "./homeComponent.scss";
import {MdFullscreen} from "react-icons/md";
import Swiper from './swiper'
import Api from "./api";
import {inject, observer} from "mobx-react";
import SearchBar from "./components/searchBar/searchBar";
const isImage = new RegExp("\\.(gif|jpg|jpeg|tiff|png)$");
const isGfyCat = new RegExp("gfycat");

@inject("stores")
@observer
class HomeComponent extends Component {

  componentDidMount() {
    window.onclick =  ()=> {
      this.props.stores.HomePageStore.showBar = false;
    };
  }

  goFullScreen = () => {
    const { HomePageStore } = this.props.stores;
    HomePageStore.toggleFullScreen();
    const elem = document.documentElement;
    if (!HomePageStore.isFullScreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  constructComponent = (post) => {
    if (isImage.test(post.url.toString())){
      return <div key={post.name} className="item">
        <img src={post.url} alt="pic here" />
      </div>;
    } else if (isGfyCat.test(post.url.toString())) {
        const baseUrl = post.url.toString().replace('https://gfycat.com/', 'https://gfycat.com/ifr/');
        const params = baseUrl.indexOf('?') !== -1? '&autoplay=0&hd=1&controls=1':'?autoplay=1&hd=1&controls=1';

      return <div className="gfycat__container item">
        <iframe title={post.name} src={baseUrl.concat(params)}  frameBorder='0' allowFullScreen width='100%' height='100%' style={{position:'absolute', top:0, left: 0, pointerEvents: 'none'}}/></div>
    }
  };

  makeStuff = (resp) => {
    const { HomePageStore } = this.props.stores;
    if (resp.data) {
      const posts = resp.data.children
          .map(post => {
            return { url: post.data.url, name: post.data.name, raw_data: post.data };
          });
      const last = resp.data.children.slice(-1)[0];
      HomePageStore.appendPosts(posts);
      HomePageStore.lastOne= last? last.data.name: '';
    }
  };
  fillWithPics = () => {
    const { HomePageStore } = this.props.stores;
     return Api.fetchPics(HomePageStore.searchInputValue).then(resp => {
       HomePageStore.subReddit = HomePageStore.searchInputValue;
      this.makeStuff(resp);
    });
  };

  loadMorePosts = (e) => {
    const { HomePageStore } = this.props.stores;
    e.stopPropagation();
    Api.fetchMorePics(
        HomePageStore.subReddit,
        HomePageStore.lastOne
    ).then(resp => {
      this.makeStuff(resp);
    });
  };

  render() {
    const { HomePageStore } = this.props.stores;
    return (
      <div className="homeComponent">
        <SearchBar onSearch={this.fillWithPics.bind(this)}/>
        <div className="item-container">
          <Swiper>
          {[...HomePageStore.posts.map(postComponent => {
            return this.constructComponent(postComponent);
          }).filter(pc => pc),  HomePageStore.posts.length > 1 ? (
                <div
                    className="btn top-bar__btn load-more__btn"
                    onClick={this.loadMorePosts}
                >
                  {" "}
                  Load more{" "}
                </div>
            ) : null]}
          </Swiper>
        </div>

        <div className='btn fs__btn' onClick={this.goFullScreen}> <MdFullscreen/> </div>
      </div>
    );
  }
}

export default HomeComponent;
