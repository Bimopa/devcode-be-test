const PAGE_SIZE = 10;

class Paging {
  static util(req) {
    let page = parseInt(req.query.page) || parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : PAGE_SIZE;

    return {
      page,
      perPage,
    };
  }
}

module.exports = Paging;
