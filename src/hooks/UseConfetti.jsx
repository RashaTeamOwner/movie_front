/* eslint-disable react/prop-types */
import Confetti from "react-dom-confetti";
function UseConfetti({ onFire }) {
  const config = {
    angle: "100",
    spread: "45",
    startVelocity: "70",
    elementCount: "200",
    dragFriction: 0.12,
    duration: "7000",
    stagger: "1",
    width: "8px",
    height: "8px",
    perspective: "500px",
    colors: ["rgb(255, 166, 0)", "#fff"],
  };
  return <Confetti active={onFire} config={config} />;
}

export default UseConfetti;
