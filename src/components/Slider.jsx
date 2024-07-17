import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Slider = ({ setCounter }) => {
  return (
    <RangeSlider
      min={0}
      max={1000}
      step={50}
      onInput={(event) => {
        setCounter(event);
      }}
    />
  );
};
export default Slider;
