const cheerio = require('cheerio');

const axiosInstance = require('../utils/axiosInstance');

const products = [];
const getProductsLink = async (req) => {
  // console.log(`products 1: ${products}`);
  // console.log(`Search ${req.search}`);
  // console.log(`Limit ${req.limit}`);
  axiosInstance.get(req.search).then((response) => {
    if (response) {
      const $ = cheerio.load(response.data);
      $('ol.search-results li.results-item').slice(0, req.limit - products.length).each((i, elem) => {
        products.push(axiosInstance.get($(elem).find('a.item__info-title').attr('href')));
      });
      // console.log(products.length < req.limit);
      // console.log(`tamanho:${products.length}`);
      if (products.length < req.limit) {
        const nextPage = $('div.pagination__container li.andes-pagination__button--next a').attr('href');
        // console.log(nextPage);
        products.concat(getProductsLink({ search: nextPage, limit: (req.limit) }));
      }
    }
  });
  console.log(`ProductsLinkFInal:${products.length}`);
};

const crawl = async (req, res) => {
  const objProducts = [];
  getProductsLink(req).then((response) => {
    console.log(response);
  });

  // return requests.forEach((request) => {
  //   request.then((response) => {
  //     if (response) {
  //       const $$ = cheerio.load(response.data);
  //       objProducts.push({
  //         name: $$('div.layout-description-wrapper').find('h1.item-title__primary').text().trim(),
  //         link: $$('link[rel="canonical"]').attr('href'),
  //         price: parseFloat($$('div.layout-description-wrapper').find('span.price-tag-symbol')
  //           .attr('content').trim()),
  //         store: $$('div.layout-description-wrapper').find('a#seller-view-more-link')
  //           .attr('href').split('br/')
  //           .pop()
  //           .replace('+', ' '),
  //         state: $$('div.layout-description-wrapper').find('div.item-conditions')
  //           .text().split('-')
  //           .shift()
  //           .trim(),
  //       });
  //     }
  //     console.log(`Tamanho final: ${objProducts.length}`);
  //     return objProducts;
  //   });
  // });
};

module.exports = crawl;
