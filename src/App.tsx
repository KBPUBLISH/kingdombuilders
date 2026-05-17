import { Route, Routes } from "react-router-dom";
import { IntroAnimation } from "./components/IntroAnimation";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Books } from "./pages/Books";
import { Listen } from "./pages/Listen";
import { Store } from "./pages/Store";
import { Newsletter } from "./pages/Newsletter";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <>
      <IntroAnimation />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
          <Route path="/listen" element={<Listen />} />
          <Route path="/store" element={<Store />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
