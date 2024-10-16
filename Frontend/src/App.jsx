import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import NotFoundScreen from "./Screens/NotFoundScreen";

const App = () => {
  return(
    <Routes>
      <Route path="/*" element={<NotFoundScreen />}/>
      <Route path="/" element={<HomeScreen />}/>
      <Route path="/HomeScreen" element={<HomeScreen />}/>
    </Routes>
  );
}
export default App;