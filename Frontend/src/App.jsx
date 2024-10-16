import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import NotFoundScreen from "./Screens/NotFoundScreen";

import Footer from "./Components/Footer/Footer";

const App = () => {
  return(
    <div>
      <Routes>
        <Route path="/*" element={<NotFoundScreen />}/>
        <Route path="/" element={<HomeScreen />}/>
        <Route path="/HomeScreen" element={<HomeScreen />}/>
      </Routes> 
      <Footer />     
    </div>
  );
}
export default App;