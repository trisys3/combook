'use strict';

export default findRoutes;
import home from './home';

function findRoutes() {
  const root = home();

  return (ctx, next) => root(ctx, next);
}
