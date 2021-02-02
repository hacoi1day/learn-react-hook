import React, {useState} from 'react';
import Hero from "./components/Hero";

App.propTypes = {

};

function App(props) {

  const [count, setCount] = useState(0);

  const handleHeroClick = () => {
    console.log('1111');
  }

  return (
    <div>
      <h1>React Hook - React.memo</h1>

      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>

      <Hero name="Easy Frontend" onClick={handleHeroClick}/>
    </div>
  );
}

export default App;