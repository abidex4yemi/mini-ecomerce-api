const express = require('express');

class AppRouter {
  getInstance() {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}

// module.exports.appRouter = express.Router()

module.exports = AppRouter;
