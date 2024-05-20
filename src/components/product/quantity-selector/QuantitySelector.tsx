'use client';

import { faCircleMinus, faPlusCircle, faPlusSquare, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChange = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value);
  }

  return (
    <div className="flex justify-between items-center max-w-20 w-full h-10">
      <button
        className="flex items-center justify-center w-10 h-full"
        onClick={() => onValueChange(-1)}
      >
        <FontAwesomeIcon icon={faSquareMinus} className="h-7 w-7 text-black" />
      </button>
      <span className="flex items-center justify-center w-16 bg-gray-100 text-center rounded ">
        {quantity}
      </span>
      <button
        className="flex items-center justify-center w-10 h-full"
        onClick={() => onValueChange(1)}
      >
        <FontAwesomeIcon icon={faPlusSquare} className="w-7 h-7 text-black" />
      </button>
    </div>

  )
}
