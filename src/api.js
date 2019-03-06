const Reddit = require("./redditApi");

const fetchPics = subReddit => {
  return Reddit.get(`/r/${subReddit}`);
};

const fetchMorePics = (subReddit, after) => {

  return Reddit.get(`/r/${subReddit}`, `after=${after}`);
};

module.exports = {
  fetchPics,
  fetchMorePics
};
