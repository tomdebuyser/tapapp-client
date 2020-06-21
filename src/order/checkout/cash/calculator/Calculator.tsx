import React, { FC, useState } from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { Button } from '../../../../_shared';
import { useToggle } from '../../../../_hooks';
import { orderSelectors } from '../../../../_store/selectors';
import { translations } from '../../../../_translations';
import './calculator.scss';

const Calculator: FC = () => {
  const totalPrice = useSelector(orderSelectors.totalPrice);
  const [value, setValue] = useState<string>();
  const [isShowingChange, setIsShowingChange] = useToggle(false);

  function clearValue() {
    setValue(null);
    setIsShowingChange(false);
  }

  function addCharacter(character: string) {
    if (isShowingChange) return;
    setValue(`${value || ''}${character}`);
  }

  function calculateChange() {
    if (isShowingChange) return;
    setValue(`${parseFloat(value) - totalPrice}`);
    setIsShowingChange();
  }

  return (
    <div className="calculator">
      <div className="calculator-line">
        <div className={classnames('calculator-display', { 'no-value': !value, 'show-change': isShowingChange })}>
          {value ? (
            <span className="value">{`€ ${value}`}</span>
          ) : (
            <span className="placeholder">{translations.getLabel('ORDER.CHECKOUT.CASH.CALCULATOR.PLACEHOLDER')}</span>
          )}
        </div>
      </div>
      <div>
        <div className="calculator-line">
          <button onClick={() => addCharacter('7')}>7</button>
          <button onClick={() => addCharacter('8')}>8</button>
          <button onClick={() => addCharacter('9')}>9</button>
        </div>
        <div className="calculator-line">
          <button onClick={() => addCharacter('4')}>4</button>
          <button onClick={() => addCharacter('5')}>5</button>
          <button onClick={() => addCharacter('6')}>6</button>
        </div>
        <div className="calculator-line">
          <button onClick={() => addCharacter('1')}>1</button>
          <button onClick={() => addCharacter('2')}>2</button>
          <button onClick={() => addCharacter('3')}>3</button>
        </div>
        <div className="calculator-line">
          <button className="non-number" onClick={() => addCharacter(',')}>
            ,
          </button>
          <button onClick={() => addCharacter('0')}>0</button>
          <button className="non-number" onClick={clearValue}>
            C
          </button>
        </div>
      </div>
      <div className="calculator-line calculator-button">
        <Button onClick={calculateChange} primary>
          {translations.getLabel('ORDER.CHECKOUT.CASH.CALCULATOR.BUTTON')}
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
