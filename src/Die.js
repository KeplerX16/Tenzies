import { useState } from "react";
import Data from "./Data";
function Die () {
   const [dataarray,setdataarray] = useState(Data)
   const [score,setScore] = useState({
    normal: 0,
    high: localStorage.getItem("highscore")|| 999
   })
   
   const handleClick = (val) => {
    const update = dataarray.map((item,index) => (
        index === val ? {...item,selected: true} : item 
    ))
    
    setdataarray(update);
   }
   function rollDice() {
   const newData = dataarray.map(die =>
    die.selected
      ? die
      : { ...die, value: Math.floor(Math.random() * 6) + 1 }
   );
   setdataarray(newData);
   setScore(prev => (
       {...prev,normal: prev.normal + 1}
   ))
   }

   function reset() {
    const newDat = dataarray.map(die =>
       die.selected &&
       {...die,selected: false , value: Math.floor(Math.random()* 6 + 1)}
   );
   setdataarray(newDat);
   if (score.normal <= score.high){
     setScore(prev => (
        {...prev,high: prev.normal}
     ))
   }
   setScore(prev => ({...prev , normal: 0}))
   alert(`Your highscore is ${score.high}`)
   localStorage.setItem("highscore",score.high)
   }

   function tryagain() {
    const newDat = dataarray.map(die =>
       die.selected &&
       {...die,selected: false , value: Math.floor(Math.random()* 6 + 1)}
   );
   setdataarray(newDat);
   localStorage.setItem("highscore",score.high)
   setScore(() => ({high:localStorage.getItem("highscore") || 999 , normal: 0}))
   alert("You lost the game , Mke sure to select the same numbered blocks and roll ... Try again")
   }

   
   const Boxes = dataarray.map(item => (
      <button 
      key={item.id} 
      className ={ `box ${ item.selected ? "selected": "" }`}
      onClick={() => handleClick(item.id - 1)}
      >
        {dataarray[item.id - 1].value}
      </button>
   ))
   const allsame = dataarray.every(v => v.value === dataarray[0].value);
   const allselected = dataarray.every(d => d.selected);
   const lost = !dataarray.every(v => v.value === dataarray[0].value) && allselected;
   const won = dataarray.every(v => v.value === dataarray[0].value) && allselected;
   return (
    <div>
        <p className="beaker">
            {Boxes}
        </p>
        <section className="footer">
            <button className="score">{`Score : ${score.normal}`}</button>
            <button
            className="roll"
            onClick={ won ? reset : (lost ? tryagain : rollDice)}
            >
                { allselected ? (allsame ? "Reset" : "Try again"): "Roll"}
            </button>
            <button className="highscore">{`HighScore: ${score.high}`}</button>
        </section>
    </div>
   );
}

export default Die;