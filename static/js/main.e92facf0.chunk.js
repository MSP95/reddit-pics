(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,,,,,,function(e,t){e.exports={get:function(e,t){var n=t?"?".concat(t):"";return fetch("".concat("https://www.reddit.com").concat(e,".json").concat(n)).then(function(e){return e.json()})}}},,,,function(e,t,n){e.exports=n(33)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(11),c=n.n(r),i=(n(25),n(4)),s=n(5),l=n(8),u=n(6),p=n(7),h=(n(26),n(15)),d=(n(27),n(13)),m=(n(28),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={startX:0,endX:0,endY:0,startY:0},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"onTouchCancelHandler",value:function(e){console.log("cancel: :->",e.changedTouches[0]),this.setState({startX:0,startY:0,endX:0,endY:0})}},{key:"onTouchEndHandler",value:function(e){var t=this,n=e.changedTouches[0]?e.changedTouches[0].clientX:0,a=e.changedTouches[0]?e.changedTouches[0].clientY:0;console.log("clientX :->",n),this.setState({endX:n,endY:a},function(){var e=t.state,n=e.startX,a=e.startY,o=e.endX,r=e.endY;t.determineGesture(n,a,o,r)})}},{key:"onTouchMoveHandler",value:function(e){}},{key:"onTouchStartHandler",value:function(e){var t=e.changedTouches[0]?e.changedTouches[0].clientX:0,n=e.changedTouches[0]?e.changedTouches[0].clientY:0;this.setState({startX:t,startY:n})}},{key:"render",value:function(){return o.a.createElement("div",{onTouchCancel:this.onTouchCancelHandler.bind(this),onTouchEnd:this.onTouchEndHandler.bind(this),onTouchMove:this.onTouchMoveHandler.bind(this),onTouchStart:this.onTouchStartHandler.bind(this)},this.props.children)}},{key:"determineGesture",value:function(e,t,n){e-n>100?this.props.onSwipeLeft():n-e>100&&this.props.onSwipeRight(),this.setState({startX:0,startY:0,endX:0,endY:0})}}]),t}(o.a.Component));m.defaultProps={onSwipeDown:function(){},onSwipeLeft:function(){},onSwipeRight:function(){},onSwipeUp:function(){}};var b,f,g,O,v,y,j,S,w,C=m,E=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={currentComponent:0,childCount:e.children.length},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"onKeyPressed",value:function(e){"ArrowRight"===e.key?this.next():"ArrowLeft"===e.key&&this.previous()}},{key:"next",value:function(){this.setState({currentComponent:this.state.childCount-1>this.state.currentComponent?this.state.currentComponent+1:0})}},{key:"previous",value:function(){this.setState({currentComponent:0<this.state.currentComponent?this.state.currentComponent-1:0})}},{key:"render",value:function(){var e=this;return o.a.createElement(C,{onSwipeRight:this.previous.bind(this),onSwipeLeft:this.next.bind(this)},o.a.createElement("div",{className:"swiper",onKeyDown:function(t){return e.onKeyPressed(t)},tabIndex:0},this.state.childCount>0?this.props.children[this.state.currentComponent]:null))}}],[{key:"getDerivedStateFromProps",value:function(e){return{childCount:e.children.length}}}]),t}(a.Component),P=n(16),k=n.n(P),_={fetchPics:function(e){return k.a.get("/r/".concat(e))},fetchMorePics:function(e,t){return k.a.get("/r/".concat(e),"after=".concat(t))},subRedditAutoComplete:function(e){return k.a.get("/api/".concat("subreddit_autocomplete_v2"),"query=".concat(e,"&include_over_18=true"))}},R=n(10),F=(n(31),n(19)),N=n(14),A=n.n(N),T=Object(R.b)("stores")(b=Object(R.c)((g=f=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).onBtnClick=function(e){var t=n.props.stores.HomePageStore;e.stopPropagation(),t.showBar?n.props.onSearch():t.showBar=!0},n.onCloseBtnClick=function(){var e=n.props.stores.HomePageStore;e.resetPosts(),e.subReddit="",e.resetSearchInputValue()},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props.stores.HomePageStore;return o.a.createElement("div",{className:A()("top-bar",{"top-bar--fixed":t.atLeastOnePost}),onClick:function(e){return e.stopPropagation()}},o.a.createElement("div",{className:"top-bar__searchBar"},o.a.createElement("div",{className:"top-bar__searchBar__search ".concat(t.showBar||!t.atLeastOnePost?"active":"")},o.a.createElement("input",{className:"top-bar__searchBar__search__input",onChange:function(e){t.onChangeSearchInputValue(e.target.value)},onKeyPress:function(n){"Enter"===n.key&&(t.resetPosts(),e.props.onSearch())},value:t.searchInputValue,placeholder:"Enter a subReddit"}),o.a.createElement("div",{className:"btn close-btn",onClick:this.onCloseBtnClick},o.a.createElement(d.a,null)," ")),o.a.createElement("div",{className:"btn top-bar__searchBar__search__btn ",onClick:this.onBtnClick},o.a.createElement(d.c,null))),o.a.createElement("div",{className:"top-bar__autoComplete"},t.subRedditAutoComplete.map(function(n){return o.a.createElement("div",{className:"top-bar__autoComplete__item",onClick:function(){t.searchInputValue=n,t.subReddit=n,e.props.onSearch(),t.subRedditAutoComplete=[]}},o.a.createElement(F.a,{className:"redditIcon"}),"r/",n)})))}}]),t}(a.Component),f.defaultProps={onSearch:function(){}},b=g))||b)||b,H=n(9),I=n(12),x=n(3),B=(n(17),n(2)),L=(n(32),Object(R.c)((S=j=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o))),Object(H.a)(n,"loading",y,Object(I.a)(Object(I.a)(n))),n.onLoadHandler=function(){n.loading=!1},n.onErrorHandler=function(){n.loading=!1},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=A()("image__imageTag",{"image__imageTag--active":!this.loading},this.props.classNames);return o.a.createElement("div",{className:"image"},o.a.createElement("img",{onLoad:this.onLoadHandler.bind(this),onError:this.onErrorHandler.bind(this),className:e,src:this.props.src,alt:this.props.alt}))}}]),t}(a.Component),j.defaultProps={alt:"Sorry, No Image Found",fallbackElement:o.a.createElement("div",{className:"image__fallbackElement"})},v=S,y=Object(x.a)(v.prototype,"loading",[B.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),O=v))||O),V=new RegExp("\\.(gif|jpg|jpeg|tiff|png)$"),z=new RegExp("gfycat");function X(e){return o.a.createElement("div",{className:e.className},"Reddit Pics")}var Y,D,q,M,K,W,G,J,$,U,Q=Object(R.b)("stores")(w=Object(R.c)(w=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).goFullScreen=function(){var e=n.props.stores.HomePageStore;e.toggleFullScreen();var t=document.documentElement;e.isFullScreen?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.msRequestFullscreen?t.msRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullscreen&&t.webkitRequestFullscreen()},n.constructComponent=function(e){if(V.test(e.url.toString()))return o.a.createElement("div",{key:e.name,className:"item"},o.a.createElement(L,{src:e.url,alt:"Could Not Load Image"}));if(z.test(e.url.toString())){var t=e.url.toString().replace("https://gfycat.com/","https://gfycat.com/ifr/"),n=-1!==t.indexOf("?")?"&autoplay=0&hd=1&controls=1":"?autoplay=1&hd=1&controls=1";return o.a.createElement("div",{className:"gfycat__container item"},o.a.createElement("iframe",{title:e.name,src:t.concat(n),frameBorder:"0",allowFullScreen:!0,width:"100%",height:"100%",style:{position:"absolute",top:0,left:0,pointerEvents:"none"}}))}},n.makeStuff=function(e){var t=n.props.stores.HomePageStore;if(e.data){var a=e.data.children.map(function(e){return{url:e.data.url,name:e.data.name,raw_data:e.data}}),o=e.data.children.slice(-1)[0];t.appendPosts(a),t.lastOne=o?o.data.name:""}},n.fillWithPics=function(){var e=n.props.stores.HomePageStore;return _.fetchPics(e.searchInputValue).then(function(t){e.subReddit=e.searchInputValue,n.makeStuff(t)})},n.loadMorePosts=function(e){var t=n.props.stores.HomePageStore;e.stopPropagation(),_.fetchMorePics(t.subReddit,t.lastOne).then(function(e){n.makeStuff(e)})},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.onclick=function(){e.props.stores.HomePageStore.showBar=!1}}},{key:"render",value:function(){var e=this,t=this.props.stores.HomePageStore;return o.a.createElement("div",{className:"homeComponent"},t.atLeastOnePost?null:o.a.createElement(X,{className:"homeComponent__banner"}),o.a.createElement(T,{onSearch:this.fillWithPics.bind(this)}),o.a.createElement("div",{className:"item-container"},o.a.createElement(E,null,[].concat(Object(h.a)(t.posts.map(function(t){return e.constructComponent(t)}).filter(function(e){return e})),[t.atLeastOnePost?o.a.createElement("div",{className:"loadMore__btn",onClick:this.loadMorePosts},"Load more"):null]))),o.a.createElement("div",{className:"btn fs__btn",onClick:this.goFullScreen}," ",o.a.createElement(d.b,null)," "))}}]),t}(a.Component))||w)||w,Z=(Y=function e(t){Object(i.a)(this,e),Object(H.a)(this,"name",D,this),console.log("props :->",t)},D=Object(x.a)(Y.prototype,"name",[B.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"test"}}),Y),ee=(q=function(){function e(){Object(i.a)(this,e),Object(H.a)(this,"searchInputValue",M,this),Object(H.a)(this,"showBar",K,this),Object(H.a)(this,"posts",W,this),Object(H.a)(this,"subReddit",G,this),Object(H.a)(this,"lastOne",J,this),Object(H.a)(this,"isFullScreen",$,this),Object(H.a)(this,"subRedditAutoComplete",U,this)}return Object(s.a)(e,[{key:"onChangeSearchInputValue",value:function(e){this.searchInputValue=e,e.length>2?this.fetchAndSetAutoCompleteResults(e):this.subRedditAutoComplete=[]}},{key:"fetchAndSetAutoCompleteResults",value:function(e){var t=this;_.subRedditAutoComplete(e).then(function(e){if(e&&e.data&&e.data.children&&e.data.children.length>0){var n=e.data.children.map(function(e){return e.data.display_name||null});t.subRedditAutoComplete=n.filter(function(e){return e})}else t.subRedditAutoComplete=[]})}},{key:"resetSearchInputValue",value:function(){this.searchInputValue="",this.subRedditAutoComplete=[]}},{key:"toggleFullScreen",value:function(){this.isFullScreen=!this.isFullScreen}},{key:"appendPosts",value:function(e){var t;(t=this.posts).push.apply(t,Object(h.a)(e))}},{key:"resetPosts",value:function(){this.posts=[],this.lastOne=""}},{key:"atLeastOnePost",get:function(){return this.posts.length>1}}]),e}(),M=Object(x.a)(q.prototype,"searchInputValue",[B.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),K=Object(x.a)(q.prototype,"showBar",[B.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),W=Object(x.a)(q.prototype,"posts",[B.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),G=Object(x.a)(q.prototype,"subReddit",[B.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),J=Object(x.a)(q.prototype,"lastOne",[B.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),$=Object(x.a)(q.prototype,"isFullScreen",[B.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),U=Object(x.a)(q.prototype,"subRedditAutoComplete",[B.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),Object(x.a)(q.prototype,"atLeastOnePost",[B.e],Object.getOwnPropertyDescriptor(q.prototype,"atLeastOnePost"),q.prototype),Object(x.a)(q.prototype,"onChangeSearchInputValue",[B.d],Object.getOwnPropertyDescriptor(q.prototype,"onChangeSearchInputValue"),q.prototype),Object(x.a)(q.prototype,"fetchAndSetAutoCompleteResults",[B.d],Object.getOwnPropertyDescriptor(q.prototype,"fetchAndSetAutoCompleteResults"),q.prototype),Object(x.a)(q.prototype,"resetSearchInputValue",[B.d],Object.getOwnPropertyDescriptor(q.prototype,"resetSearchInputValue"),q.prototype),Object(x.a)(q.prototype,"toggleFullScreen",[B.d],Object.getOwnPropertyDescriptor(q.prototype,"toggleFullScreen"),q.prototype),Object(x.a)(q.prototype,"appendPosts",[B.d],Object.getOwnPropertyDescriptor(q.prototype,"appendPosts"),q.prototype),Object(x.a)(q.prototype,"resetPosts",[B.d],Object.getOwnPropertyDescriptor(q.prototype,"resetPosts"),q.prototype),q),te=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e={ExampleStore:new Z("Example store initialized"),HomePageStore:new ee};return o.a.createElement(R.a,{stores:e},o.a.createElement("div",{className:"App"},o.a.createElement(Q,null)))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(te,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[20,1,2]]]);
//# sourceMappingURL=main.e92facf0.chunk.js.map