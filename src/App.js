import React, { Component } from "react";
import "./App.scss";

const Api = require("./api");
const isImage = new RegExp("\\.(gif|jpg|jpeg|tiff|png)$");
const isGfyCat = new RegExp("gfycat");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      subReddit: "",
      isFullScreen: false
    };
  }

  // componentDidMount() {
  //   this.fillWithPics();
  // }

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
        this.fillWithPics();
      }
    };
    return (
      <div className="top-bar">
        <div className="top-bar__search">
          <input
            className="top-bar__input"
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={this.state.subReddit}
            placeholder="Enter a subReddit"
          />
          <button className="btn close-btn" onClick={this.onCloseBtnClick} >X</button>
        </div>
        <button className="btn top-bar__btn " onClick={this.onBtnClick}>
          Get Pics!
        </button>
      </div>
    );
  };

  constructComponent = (post) => {
    if (isImage.test(post.url.toString())) {
      return <div key={post.name} className="item">
        <img src={post.url} alt="pic here" />
      </div>;
    } else if (isGfyCat.test(post.url.toString())) {
        const baseUrl = post.url.toString().replace('https://gfycat.com/', 'https://gfycat.com/ifr/');
        const params = '&autoplay=0&hd=1&controls=1';

      return <div className="gfycat__container">
        <iframe title={post.name} src={baseUrl.concat(params)}  frameborder='0' allowfullscreen width='100%' height='100%' style={{position:'absolute', top:0, left: 0}}/></div>
    }
  };

  fillWithPics = () => {
    Api.fetchPics(this.state.subReddit).then(resp => {
      if (resp.data) {
        const posts = resp.data.children
          .map(post => {
            return this.constructComponent({ url: post.data.url, name: post.data.name, raw_data: post.data });
          });
        this.setState({
          posts: posts
        });
      }
    });
  };

  onBtnClick = () => {
    this.fillWithPics();
  };

  onCloseBtnClick = () => {
    this.setState({posts: [], subReddit:""})
  };

  loadMorePosts = () => {
    Api.fetchMorePics(
      this.state.subReddit,
      this.state.posts[this.state.posts.length - 1].name
    ).then(resp => {
      if (resp.data) {
        const posts = resp.data.children
          .map(post => {
            return { url: post.data.url, name: post.data.name };
          })
          .filter(o => isImage.test(o.url.toString()));
        this.setState({
          posts: [...this.state.posts, ...posts]
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        {this.topBar()}

        <div className="item-container">
          {this.state.posts.map(postComponent => {
            return (postComponent);
          })}
        </div>
        {this.state.posts.length > 1 ? (
          <div
            className="btn top-bar__btn load-more__btn"
            onClick={this.loadMorePosts}
          >
            {" "}
            Load more{" "}
          </div>
        ) : null}
        <div className='btn fs__btn' onClick={this.goFullScreen}> {'< >'} </div>
      </div>
    );
  }
}

export default App;
