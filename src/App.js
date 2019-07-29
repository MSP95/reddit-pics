import React, { Component } from "react";
import "./App.scss";
import {MdClose, MdFullscreen, MdSearch} from "react-icons/md";
import Swiper from './swiper'
const Api = require("./api");
const isImage = new RegExp("\\.(gif|jpg|jpeg|tiff|png)$");
const isGfyCat = new RegExp("gfycat");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      subReddit: "",
      lastOne: "",
      isFullScreen: false,
      showBar: true
    };
  }

  componentDidMount() {
    window.onclick =  ()=> {
      this.setState({showBar: false})
    };
  }

  goFullScreen = () => {
    this.setState({isFullScreen: !this.state.isFullScreen});
    const elem = document.documentElement;
    if (!this.state.isFullScreen) {
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

  topBar = () => {
    const onChange = e => {
        this.setState({
          subReddit: e.target.value
        });
    };

    const onKeyPress = e => {
      if (e.key === "Enter") {
        this.setState({posts: [], lastOne:""});
        this.fillWithPics();
      }
    };
    return (
      <div className="top-bar" onClick={e => e.stopPropagation()}>
        <div className={`top-bar__search ${this.state.showBar? 'active': ''}`}>
          <input
            className="top-bar__input"
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={this.state.subReddit}
            placeholder="Enter a subReddit"
          />
          <div className="btn close-btn" onClick={this.onCloseBtnClick} ><MdClose/> </div>
        </div>
        <div className="btn top-bar__btn " onClick={this.onBtnClick}>
          <MdSearch/>
        </div>
      </div>
    );
  };

  constructComponent = (post) => {
    if (isImage.test(post.url.toString())){
      return <div key={post.name} className="item">
        <img src={post.url} alt="pic here" />
      </div>;
    } else if (isGfyCat.test(post.url.toString())) {
        const baseUrl = post.url.toString().replace('https://gfycat.com/', 'https://gfycat.com/ifr/');
        const params = baseUrl.indexOf('?') !== -1? '&autoplay=0&hd=1&controls=1':'?autoplay=0&hd=1&controls=1';

      return <div className="gfycat__container">
        <iframe title={post.name} src={baseUrl.concat(params)}  frameborder='0' allowfullscreen width='100%' height='100%' style={{position:'absolute', top:0, left: 0}}/></div>
    }
  };

  makeStuff = (resp) => {
    if (resp.data) {
      const posts = resp.data.children
          .map(post => {
            return this.constructComponent({ url: post.data.url, name: post.data.name, raw_data: post.data });
          });
      const last = resp.data.children.slice(-1)[0];
      this.setState({
        posts: [...this.state.posts, ...posts],
        lastOne: last? last.data.name: '',
      });
    }
  };
  fillWithPics = () => {
     return Api.fetchPics(this.state.subReddit).then(resp => {
      this.makeStuff(resp);
    });
  };

  onBtnClick = (e) => {
    e.stopPropagation();
    if (this.state.showBar) {

      this.fillWithPics();

    } else {
      this.setState({showBar: true});
    }

  };

  onCloseBtnClick = () => {
    this.setState({posts: [], subReddit:"", lastOne:""})
  };

  loadMorePosts = (e) => {
    e.stopPropagation();
    Api.fetchMorePics(
      this.state.subReddit,
      this.state.lastOne
    ).then(resp => {
      this.makeStuff(resp);
    });
  };

  render() {
    return (
      <div className="App">
        {this.topBar()}

        <div className="item-container">
          <Swiper>
          {[...this.state.posts.map(postComponent => {
            return (postComponent);
          }).filter(pc => pc),  this.state.posts.length > 1 ? (
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

export default App;
