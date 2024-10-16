import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import NotFoundScreen from "./Screens/NotFoundScreen";
import MenuScreen from "./Screens/MenuScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen";

import Footer from "./Components/Footer/Footer";

const App = () => {
  return(
    <div>
      <Routes>
        <Route path="/*" element={<NotFoundScreen />}/>
        <Route path="/" element={<HomeScreen />}/>
        <Route path="/HomeScreen" element={<HomeScreen />}/>
        <Route path="/MenuScreen" element={<MenuScreen />}/>
        <Route path="/RegisterScreen" element={<RegisterScreen />}/>
        <Route path="/LoginScreen" element={<LoginScreen />}/>
      </Routes> 
      <Footer />     
    </div>
  );
}
export default App;