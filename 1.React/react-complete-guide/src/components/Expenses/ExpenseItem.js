import './ExpenseItem.css'
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import { useState } from 'react';

const ExpenseItem = (props) => {
  const [title, setTitle] = useState(props.title);

  const buttonClickHandler = () => {
    const newTitle = prompt('바꿀 타이틀');
    setTitle(newTitle);
  }

  return (
    <Card className={`expense-item`}>
      <ExpenseDate date={props.date}></ExpenseDate>
      <div className={`expense-item__description`}>
        <h2>{title}</h2>
      </div>
      <div className={`expense-item__price`}>${props.amount}</div>
      <button onClick={buttonClickHandler}>change title</button>
    </Card>
  );
}

export default ExpenseItem;