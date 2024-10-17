import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Styles/PaymentScreen.css";
import ip from '../config';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newCard, setNewCard] = useState({
    number: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });

  const [savedCards, setSavedCards] = useState(() => {
    const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    return savedCards;
  });

  useEffect(() => {
    localStorage.setItem('savedCards', JSON.stringify(savedCards));
  }, [savedCards]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const card = selectedCard ? savedCards.find(card => card.id === selectedCard) : newCard;

    const response = await fetch(`${ip}/process-payment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalPrice,
        card,
      }),
    });

    const result = await response.json();

    if (result.error) {
      alert(result.error);
      setLoading(false);
    } else {
      window.location.href = result.payment_url;
    }
  };

  const addNewCard = () => {
    const newCardWithId = {
      id: `card${savedCards.length + 1}`,
      ...newCard,
    };

    setSavedCards([...savedCards, newCardWithId]);

    setNewCard({
      number: '',
      expMonth: '',
      expYear: '',
      cvc: '',
    });

    setSelectedCard(newCardWithId.id);
  };

  return (
    <div className="payment-screen">
      <h2>Оплата</h2>
      <form onSubmit={handleSubmit}>
        <div className="card-selection">
          <h3>Выберите карту</h3>
          {savedCards.map(card => (
            <label key={card.id} className="card-option">
              <input
                type="radio"
                name="card"
                value={card.id}
                checked={selectedCard === card.id}
                onChange={() => setSelectedCard(card.id)}
              />
              <span>{card.number}</span>
            </label>
          ))}
          <label className="card-option">
            <input
              type="radio"
              name="card"
              value="new"
              checked={!selectedCard}
              onChange={() => setSelectedCard(null)}
            />
            <span>Добавить новую карту</span>
          </label>
        </div>
        {!selectedCard && (
          <div className="new-card-form">
            <h3>Добавить новую карту</h3>
            <div className="form-group">
              <label>Номер карты</label>
              <input
                type="text"
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                placeholder="Номер карты"
              />
            </div>
            <div className="form-group">
              <label>Срок действия (месяц/год)</label>
              <div className="expiry-date">
                <input
                  type="text"
                  value={newCard.expMonth}
                  onChange={(e) => setNewCard({ ...newCard, expMonth: e.target.value })}
                  placeholder="Месяц"
                />
                <input
                  type="text"
                  value={newCard.expYear}
                  onChange={(e) => setNewCard({ ...newCard, expYear: e.target.value })}
                  placeholder="Год"
                />
              </div>
            </div>
            <div className="form-group">
              <label>CVC</label>
              <input
                type="text"
                value={newCard.cvc}
                onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                placeholder="CVC"
              />
            </div>
            <button type="button" onClick={addNewCard}>
              Добавить карту
            </button>
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Обработка...' : `Оплатить ${totalPrice} ₽`}
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;