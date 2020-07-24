const cheerio = require('cheerio');

const axiosInstance = require('../utils/axiosInstance');

const getProductsLink = async (req, res) => axiosInstance.get(req.search).then((response) => {
  if (response) {
    const $ = cheerio.load(response.data);
    $('ol.search-results li.results-item').slice(0, req.limit - res.length).each((i, elem) => {
      res.push(axiosInstance.get($(elem).find('a.item__info-title').attr('href')));
    });

    if (res.length < req.limit) {
      const nextPage = $('div.pagination__container li.andes-pagination__button--next a').attr('href');

      return getProductsLink({ search: nextPage, limit: (req.limit) }, res);
    }
  }
  return res;
});

const crawl = async (req) => {
  const objProducts = [];
  return getProductsLink(req, []).then((products) => {
    products.forEach((product) => product.then((response) => {
      if (response) {
        const $$ = cheerio.load(response.data);

        objProducts.push({
          name: $$('div.layout-description-wrapper').find('h1.item-title__primary').text().trim(),
          link: $$('link[rel="canonical"]').attr('href'),
          price: parseFloat($$('div.layout-description-wrapper').find('span.price-tag-symbol')
            .attr('content').trim()),
          store: $$('div.layout-description-wrapper').find('a#seller-view-more-link')
            .attr('href').split('br/')
            .pop()
            .replace('+', ' '),
          state: $$('div.layout-description-wrapper').find('div.item-conditions')
            .text().split('-')
            .shift()
            .trim(),
        });
      }
    }));
    return objProducts;
  });
};

module.exports = crawl;
