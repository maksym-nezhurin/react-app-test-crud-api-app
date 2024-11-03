import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Dispatch, SetStateAction, useState } from "react";
import * as React from "react";
import { Input } from "../ui/input.tsx";

type Option = { label: string; value: string };

interface ISelectProps {
    placeholder: string;
    options: Option[];
    selectedOptions: string[];
    setSelectedOptions: Dispatch<SetStateAction<string[]>>;
}

const MultiSelect = React.forwardRef<HTMLDivElement, ISelectProps>(({
                                                                        placeholder,
                                                                        options,
                                                                        selectedOptions,
                                                                        setSelectedOptions,
                                                                    }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [localOptions, setLocalOptions] = useState<Option[]>(options);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddOption = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && inputValue && !localOptions.find(option => option.value === inputValue)) {
            const newOption = { label: inputValue, value: inputValue };
            setLocalOptions(prevOptions => [...prevOptions, newOption]);
            setInputValue('');
        }
    };

    const handleSelectChange = (value: string) => {
        setSelectedOptions(prev => {
            return prev.includes(value) ? prev.filter(option => option !== value) : [...prev, value];
        });
    };

    const isOptionSelected = (value: string) => selectedOptions.includes(value);

    return (
        <div ref={ref}>
            <DropdownMenu>
                <div className={'absolute bottom-9 right-1 flex bg-white'}>{
                    selectedOptions.map((item) => <div className={'rounded px-1 mr-1 border text-xs'}>{item}</div>)
                }</div>
                <DropdownMenuTrigger asChild className="w-full">
                    <Input type={'text'} value={inputValue} onChange={handleInputChange} onKeyDown={handleAddOption}
                           placeholder={placeholder}/>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
                    {localOptions.map((option) => (
                        <DropdownMenuCheckboxItem
                            onSelect={(e) => e.preventDefault()}
                            key={option.value}
                            checked={isOptionSelected(option.value)}
                            onCheckedChange={() => handleSelectChange(option.value)}
                        >
                            {option.label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
});

MultiSelect.displayName = "MultiSelect";

export {MultiSelect};
