import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { setupStore } from "./redux/store";
import "./main.sass";
import "./languages/i18n.js";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);
