import { useState, useCallback } from "react";

type Return = {
  text: string;
  textColor: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleColorChange: (newColor: string) => void;
};

export default function useChangeTextAndColor(
  initialColor = "black-100",
): Return {
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState(initialColor);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    [],
  );

  const handleColorChange = useCallback((color: string) => {
    setTextColor(color);
  }, []);

  return {
    text,
    textColor,
    handleTextChange,
    handleColorChange,
  };
}
