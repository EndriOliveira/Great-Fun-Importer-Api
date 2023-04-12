module.exports = (server) => {
  let route,
    routes = [];

  server._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // routes registered directly on the server
      routes.push(middleware.route);
    } else if (middleware.name === 'router') {
      // router middleware
      middleware.handle.stack.forEach((handler) => {
        route = handler.route;
        route && routes.push(route);
      });
    }
  });

  routes.forEach((route) => {
    console.log({ path: route.path, method: Object.keys(route.methods) });
  });
};
