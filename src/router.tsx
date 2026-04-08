import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts';
import TestPage from './pages/TestPage';
import { EditPage, ViewAllPage, ViewDetailPage } from './pages';
import { CreatePage } from './pages/CreatePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/view',
        element: <ViewAllPage />,
      },
      {
        path: '/view/:id',
        element: <ViewDetailPage />,
      },
      {
        path: '/create',
        element: <CreatePage />,
      },
      {
        path: '/edit/:id',
        element: <EditPage />,
      },
      {
        path: '/test',
        element: <TestPage />,
      },
    ],
  },
]);
