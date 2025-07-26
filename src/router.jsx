import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CommentPage from "./pages/CommentPage.jsx";
import WritePage from "./pages/WritePage.jsx";
import DetailPage from "./pages/DetailPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CommentPage />,
      },
      {
        path: "/write",
        element: <WritePage />,
      },
      {
        path: "/comment/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
