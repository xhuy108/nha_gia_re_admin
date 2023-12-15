import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import ErrorPage from './error-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//main route here
import DashBoard from './modules/dashboard/dashboard';
import PendingPost, {
  loader as pendingPostLoader,
} from './modules/post/screens/PendingPost';
import { action as postAction } from './modules/post/action';
import ApprovedPost, {
  loader as approvedPostLoader,
} from './modules/post/screens/ApprovedPost';
import RejectedPost, {
  loader as rejectedPostLoader,
} from './modules/post/screens/RejectedPost';
import User from './modules/user/screens/User';
import PendingUser from './modules/user/screens/PendingUser';
import VertificatedUser from './modules/user/screens/VertificatedUser';
import Blog from './modules/blog/screens/Blog';
import Package from './modules/package/screens/Package';

import Root from './Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          {
            index: true,
            element: <DashBoard />,
          },
          {
            path: 'pending_post',
            element: <PendingPost />,
            loader: pendingPostLoader,
            action: postAction,
          },
          {
            path: 'approved_post',
            element: <ApprovedPost />,
            loader: approvedPostLoader,
            action: postAction,
          },
          {
            path: 'rejected_post',
            element: <RejectedPost />,
            loader: rejectedPostLoader,
            action: postAction,
          },
          {
            path: 'user',
            element: <User />,
          },
          {
            path: 'verificated_user',
            element: <VertificatedUser />,
          },
          {
            path: 'pending_user',
            element: <PendingUser />,
          },
          {
            path: 'blog',
            element: <Blog />,
          },
          {
            path: 'package',
            element: <Package />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
