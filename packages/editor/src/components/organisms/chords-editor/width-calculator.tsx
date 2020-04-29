import React, { useState, useLayoutEffect, useRef } from 'react';
import ChordContainer from './chord-container';

const charPixels: number[] = [];

export interface WidthCalculatorProps {
  text: string;
  onComplete: (charPixels: number[]) => void;
}

const WidthCalculator: React.FC<WidthCalculatorProps> = ({ text, onComplete }) => {
  const [calculated, setCalculated] = useState(false);
  const [n, setN] = useState(1);
  // const [charPixels, setPixels] = useState<number[]>([]);
  const textRef = useRef(null);
  useLayoutEffect(() => {
    // if(calculated) return;
    const width = (textRef.current as unknown as Element).getBoundingClientRect().width;
    // console.log(`in useEffect n=${n} width=${width}`)
    // setPixels([...charPixels, width])
    charPixels.push(width);
    if (n + 1 > text.length) {
      onComplete(charPixels);
      console.log(`Width calculation completed: ${charPixels}`)
      // setCalculated(true);
    } else {
      setN(n + 1);
    }
  }, [calculated, n, text, textRef, onComplete]);
  return (
    <ChordContainer ref={textRef}>
      {text.slice(0, n).replace(/^\s|\s$/g, '\u00a0')}
    </ChordContainer>
  )
}

export default WidthCalculator;
