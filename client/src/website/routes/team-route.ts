import {lazy} from 'website/utils';

import {Routes} from '../services';

const About = lazy(import('../pages/about'), 'About');

export const TeamRoutes: Routes = [
  {
    path: '/team',
    layout: 'no-footer',
    children: [
      {
        path: '/about',
        component: About,
      },
    ],
  },
];
