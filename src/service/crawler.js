const cheerio = require('cheerio');

const axiosInstance = require('../utils/axiosInstance');

const getProductsLink = async (req, res) => {
  const products = new Array();
  return axiosInstance.get(req.search).then((response) => {
    const $ = cheerio.load(response.data);
    $('ol.search-results li.results-item').slice(0, req.limit).each((i, elem) => {
      products.push(axiosInstance.get($(elem).find('a.item__info-title').attr('href')));
    });
    return products;
  });
};

const getStore = async (req, res) => {
  const products = new Array();
  return axiosInstance.get(req.search).then((response) => {
    const $ = cheerio.load(response.data);
    $('ol.search-results li.results-item').slice(0, req.limit).each((i, elem) => {
      products.push(axiosInstance.get($(elem).find('a.item__info-title').attr('href')));
    });
    return products;
  });
};

const crawl = async function (req, res) {
  const objProducts = [];
  const requests = await getProductsLink(req, res);
  return requests.forEach((request) => {
    request.then((response) => {
      const $$ = cheerio.load(response.data);
      objProducts.push({
        name: $$('div.layout-description-wrapper').find('h1.item-title__primary').text().trim(),
        link: $$('link[rel="canonical"]').attr('href'),
        price: $$('div.layout-description-wrapper').find('span.price-tag-symbol').attr('content').trim(),
        store: $$('div.layout-description-wrapper').find('a#seller-view-more-link').attr('href'),
        state: $$('div.layout-description-wrapper').find('div.item-conditions').text().split('-')
          .shift()
          .trim(),
      });
      console.log(objProducts);
      return objProducts;
    });
  });
};

module.exports = crawl;
