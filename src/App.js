import { Suspense, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { PATHS, router as routes } from "./Routes";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";

function App() {
  const router = useRoutes(routes);
  const { authenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate(PATHS.LOGIN);
    }
  }, [authenticated, navigate]);
  return (
    <div className="App">
      {authenticated && <Navbar />}
      <Suspense fallback=<Spinner />>{router}</Suspense>
    </div>
  );
}

export default App;
