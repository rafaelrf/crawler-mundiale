const cheerio = require('cheerio');

const axiosInstance = require('../utils/axiosInstance');

const crawl = function (searchTerm) {
  const products = [];
  return axiosInstance.get(searchTerm).then((response) => {
    const $ = cheerio.load(response.data);
    $('ol.search-results li span.main-title').each((i, elem) => {
      const obj = {
        idiom: $(elem).text(),
      };
      products.push(obj);
    });
  });
};

module.exports = crawl;
