import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../Charts.css";

const DiscreteSlider = () => {
  const [value, setValue] = useState(3); // Initial value

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="sliders">
      <Slider
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={handleSliderChange}
      />
      <div>Selected value: {value}</div>
    </div>
  );
};

export default DiscreteSlider;
