const HOST = "https://www.reddit.com";

const get = (urlPath, queryParams) => {
  const query = queryParams ? `?${queryParams}` : "";
  return fetch(`${HOST}${urlPath}.json${query}`).then(response =>
    response.json()
  );
};



module.exports = {
  get
};
