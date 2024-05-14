import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div className={`flex items-center rounded-sm py-2 px-3.5 text-sm lg:text-base font-bold text-white ${isPaid ? 'bg-green-800' : 'bg-rose-700'}`}>
      <FontAwesomeIcon icon={faCreditCard} className='h-5 w-5 lg:h-6 lg:w-6' />
      <span className="mx-2">
        {
          isPaid ? 'Pagada' : 'No pagada'
        }
      </span>
    </div>
  )
}
