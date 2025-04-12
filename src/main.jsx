import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import Layout from "../routes/Layout.jsx";
import DetailView from "../routes/DetailView.jsx";
import NotFound from "../routes/NotFound.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index={true} element={<App />} />
      <Route
        index={false}
        path="/movie/:id"
        element={<DetailView />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>
)
