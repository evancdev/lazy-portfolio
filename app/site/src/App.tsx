import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import ServerError from "@/pages/ServerError";
import ErrorBoundary from "@/components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/500" element={<ServerError />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
