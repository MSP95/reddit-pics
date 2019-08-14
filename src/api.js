import Reddit from "./redditApi";

const fetchPics = subReddit => {
  return Reddit.get(`/r/${subReddit}`);
};

const fetchMorePics = (subReddit, after) => {

  return Reddit.get(`/r/${subReddit}`, `after=${after}`);
};

const subRedditAutoComplete = (query) => {
  return Reddit.get(`/api/${'subreddit_autocomplete_v2'}`, `query=${query}&include_over_18=true`);
};
export default {
  fetchPics,
  fetchMorePics,
  subRedditAutoComplete
};
