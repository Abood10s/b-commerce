import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { router as routes } from "./Routes";

function App() {
  console.log(process.env.REACT_APP_API_URL);
  const router = useRoutes(routes);

  return (
    <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>{router}</Suspense>
    </div>
  );
}

export default App;
