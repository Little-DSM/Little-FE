import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { GlobalStyle } from './styles/theme/GlobalStyle';
import { AuthProvider } from './context/AuthContext';

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <GlobalStyle />
    </AuthProvider>
  );
};
