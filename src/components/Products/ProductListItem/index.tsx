import {cn} from "../../../lib/utils.ts";
import {Button} from "../../ui/button.tsx";
import {useCard} from "../../../contexts/CardProvider.tsx";
import {TimerIcon} from "@radix-ui/react-icons"
import {IProduct} from "../../../types";

interface IProps extends IProduct {
    classNames?: string
}

export const ProductListItem = (props: IProps) => {
    const {
        name,
        description,
        classNames,
        price,
        availability,
        isDeleted,
        image,
        _id
    } = props;
    const {addProduct, removeProduct} = useCard();

    // This function decides the availability color
    const availabilityColor = availability === 0 ? 'text-red-500' : 'text-green-500';

    return (
        <div
            className={cn("flex flex-row rounded-lg overflow-hidden ", classNames, {
                ['bg-gray-200']: isDeleted,
                ['hover:bg-gray-50 transition-colors shadow-md bg-white']: !isDeleted,
            })}>
            {/* Image container */}
            <div className="w-40 h-40 bg-gray-200 flex-shrink-0">
                {image ? <img src={`/${image}`} alt={name} className="w-full h-full object-cover"/> :
                    <div className="flex items-center justify-center h-full">No image</div>}
            </div>

            {/* Text content container */}
            <div className="flex flex-col p-4 flex-grow">
                <div className="flex justify-end">
                    <Button onClick={() => removeProduct(_id)}><TimerIcon/></Button>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
                <p className="text-gray-600 mb-3 text-sm">{description}</p>
                <div className="mt-auto">
                    <div className="flex justify-between items-center">
                        <span className={`text-base ${availabilityColor}`}>
                            {availability > 0 ? `In stock: ${availability}` : 'Out of stock'}
                        </span>
                        <span className="text-lg font-medium text-gray-800">
                            ${price.toFixed(2)}
                        </span>
                    </div>
                </div>

                <div className={'grid grid-cols-2'}>
                    <Button variant={'ghost'} className={'mr-2'} onClick={() => addProduct([{...props}])}>Buy</Button>
                    <Button variant={'destructive'}>Edit</Button>
                </div>
            </div>

        </div>
    );
}
