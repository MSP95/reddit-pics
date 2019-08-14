import {observable, action} from 'mobx';
import Api from "../api";

class HomePageStore {

    // observables
    @observable searchInputValue = '';
    @observable showBar = true;
    @observable posts = [];
    @observable subReddit = '';
    @observable lastOne = '';
    @observable isFullScreen = false;
    @observable subRedditAutoComplete = [];

    @action
    onChangeSearchInputValue(value) {
        this.searchInputValue = value;
        if (value.length > 2) {
        this.fetchAndSetAutoCompleteResults(value);
        } else {
            this.subRedditAutoComplete = [];
        }
    }

    @action
    fetchAndSetAutoCompleteResults(query) {
        Api.subRedditAutoComplete(query).then((resp)=>{
           if (resp && resp.data && resp.data.children && resp.data.children.length > 0) {
               const results = resp.data.children.map(listing => listing.data.display_name || null);
               this.subRedditAutoComplete = results.filter((l)=> l);
           } else {
               this.subRedditAutoComplete = [];
           }
            
        });
    }

    @action
    resetSearchInputValue() {
        this.searchInputValue = '';
        this.subRedditAutoComplete = [];
    }

    @action
    toggleFullScreen() {
        this.isFullScreen = !this.isFullScreen;
    }

    @action
    appendPosts(posts) {
        this.posts.push(...posts);
    }

    @action
    resetPosts() {
        this.posts = [];
        this.lastOne = '';
    }
}

export default HomePageStore;