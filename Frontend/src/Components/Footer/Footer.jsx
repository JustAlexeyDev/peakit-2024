import "./Footer.css";

import { House, Utensils, ShoppingCart, Heart, History } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return(
    <div className="Footer--Coontainer">
      <Link to="/" className="Footer--Item">
        <House />
        <p>Главная</p>
      </Link>
      <Link to="/MenuScreen" className="Footer--Item">
        <Utensils />
        <p>Меню</p>
      </Link>
      <Link to="/CartScreen" className="Footer--Item">
        <ShoppingCart />
        <p>Корзина</p>
      </Link>
      <Link to="/FavoritesScreen" className="Footer--Item">
        <Heart />
        <p>Избранное</p>
      </Link>
      <Link to="/HistoryScreen" className="Footer--Item">
        <History />
        <p>История</p>
      </Link>
    </div>
  );
}
export default Footer;