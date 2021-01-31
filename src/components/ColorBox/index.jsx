import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './ColorBox.scss';

ColorBox.propTypes = {

};

const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];

function getRandomColor() {
  const randomIndex = Math.trunc(Math.random() * 5);
  return COLOR_LIST[randomIndex];
}

function ColorBox() {

  const [color, setColor] = useState(() => {
    const initColor = localStorage.getItem('box_color')  || 'deeppink';
    return initColor;
  });

  function handleBoxClick() {
    // get random color
    const newColor = getRandomColor();
    // set color
    setColor(newColor);
    // save to localStorage
    localStorage.setItem('box_color', newColor);
  }

  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={handleBoxClick}
    >
      COLOR BOX
    </div>
  );
}

export default ColorBox;