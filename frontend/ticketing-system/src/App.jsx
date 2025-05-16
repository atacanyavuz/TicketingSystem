import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/LoginPage";
import TicketList from "./pages/tickets/TicketList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tickets" element={<TicketList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
