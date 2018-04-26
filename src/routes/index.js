/* @flow */

import React from 'react';
import UniversalRouter from 'universal-router/main.js';


// For more information visit https://github.com/kriasoft/universal-router
const routes = [
  {
    path: '/',
    children: [
      {
        path: '/',
        components: () => [import(/* webpackChunkName: 'home' */ './Home')],
        render: ({ data, components: [Home] }) => ({
          title: 'Home',
          body: <Home data={data} />,
        }),
      },
      {
        path: '/project/:id',
        components: () => [import(/* webpackChunkName: 'home' */ './Home')],
        render: ({ data, id, components: [Home] }) => ({
          title: 'Home',
          body: <Home data={data} id={id} />,
        }),
      },
    ]
  },
  {
    path: '(.*)', // wildcard route (must go last)
    action: () => (
      new Promise(resolve => resolve())
    ),
    components: () => [import(/* webpackChunkName: 'notFound' */ './NotFound')],
    render: ({ components: [NotFound] }) => ({
      title: 'Not found',
      body: <NotFound />,
    }),
  },
];

function resolveRoute(ctx) {
  const { route, user, location, params: { id } } = ctx;

  if (!route.render)
    return ctx.next();


  return Promise.all(route.components()).then(components => 
    ctx.render({
      user,
      location,
      route: route.render({
        location,
        id,
        components: components.map(x => x.default),
      }),
    }),
  );
}

export default new UniversalRouter(routes, { resolveRoute });
