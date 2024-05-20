import { Size } from "@/interfaces"
interface Props {
  selectedSize?: Size;
  availableSizes: Size[]
  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold text-lg mb-3">Tallas disponibles</h3>
      <div className="flex">
        {
          availableSizes.map(size => (
            <button
              key={size}
              onClick={() => onSizeChanged(size)}
              className={`mx-2 hover:underline text-lg ${selectedSize === size ? "underline" : ""}`}>
              {size}
            </button>
          ))
        }
      </div>
    </div>
  )
}
