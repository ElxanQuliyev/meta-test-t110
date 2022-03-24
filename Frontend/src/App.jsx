import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import { BrowserRouter as Router } from "react-router-dom";
  import MyRoutes from "./config/MyRoutes";
import Filter from "./components/filter/Filter";

      <link
    async
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
  />
  

function App() {
  

  return (
    
     <Router>
      <Header />
      <MyRoutes/>
      <Footer />
     </Router>
   
  );
}

export default App;
