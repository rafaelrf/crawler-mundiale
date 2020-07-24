const crawl = require('../service/crawler');

const findProducts = async (req, res) => {
  try {
    const { search, limit } = req.body;
    crawl({ search, limit }).then((results) => res.status(200).json(results));
    return res;
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  findProducts,
};
