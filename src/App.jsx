import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ModalLoad } from "./components/Modals/Modals";
import Auth from "./components/Auth/Auth";
import { supportedLngs } from "./utils/ConstCapture";
import Layout from "./components/Layout/Layout";
import SelectParts from "./pages/SelectParts/SelectParts";

const WorkstationsList = lazy(() =>
  import("./pages/WorkstationsList/WorkstationsList")
);

const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const App = () => {
  const path = window.location.pathname.split("/");
  const pathLanguage = supportedLngs.includes(path[1]) ? path[1] : "";

  return (
    <Suspense fallback={<ModalLoad />}>
      <BrowserRouter basename={`/${pathLanguage}`}>
        <Layout>
          <Routes>
            <Route
              index
              path="/workstations/:tab?"
              element={<WorkstationsList />}
            />
            <Route
              path="/select-parts/:quantity?/:part?"
              element={<SelectParts />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
};

const AppWithAuthControl = Auth(App);

export default AppWithAuthControl;
