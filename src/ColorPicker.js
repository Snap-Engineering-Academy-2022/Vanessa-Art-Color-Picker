import React, { useState } from "react";
import { HslColorPicker } from "react-colorful";

export default function ColorPicker() {
  const [color, setColor] = useState({ h: 53, s: 99, l: 49 });
  console.log(color); // use color.h, .s, .l to isolate hue, saturation, lightness
  return (
    <div>
      <HslColorPicker
        className="color-picker"
        color={color}
        onChange={setColor}
      />
    </div>
  );
}
