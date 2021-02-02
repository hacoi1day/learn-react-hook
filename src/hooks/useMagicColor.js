import {useState, useEffect, useRef} from 'react';

const COLOR_LIST = ['red', 'green', 'yellow'];


function randomColor(currentColor) {
  // random 0 --> 2
  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;

  while (currentIndex === newIndex) {
    newIndex = Math.trunc(Math.random() * 3);
  }

  console.log(COLOR_LIST[newIndex]);
  return COLOR_LIST[newIndex];
}

function useMagicColor() {
  const [color, setColor] = useState('transparent');
  const colorRef = useRef('transparent');

  // Change color everyone 1 second
  useEffect(() => {
    const colorInterval = setInterval(() => {
      // console.log('First color: ', color);
      // console.log('Change color: ', colorRef.current);
      const newColor = randomColor(colorRef.current);
      setColor(newColor);
      colorRef.current = newColor;
    }, 1000);

    return () => {
      // cleanup
      clearInterval(colorInterval);
    }
  }, []);

  return color;
}

export default useMagicColor;