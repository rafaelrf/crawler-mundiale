const crawl = require('../service/crawler');

const findProducts = async (req, res) => {
  try {
    const { search, limit } = req.body;
    return res.status(200).json(crawl({ search, limit }));
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  findProducts,
};
