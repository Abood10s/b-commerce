import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { router as routes } from "./Routes";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";

function App() {
  const router = useRoutes(routes);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="App">
      {user && <Navbar />}
      <Suspense fallback=<Spinner />>{router}</Suspense>
    </div>
  );
}

export default App;
