import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { GlobalStyle } from "./styles/theme/GlobalStyle";

export const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <GlobalStyle />
    </div>
  );
};
