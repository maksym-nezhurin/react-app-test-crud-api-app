import {useState} from "react";
import {Popover, PopoverTrigger, PopoverContent} from "../ui/popover";
import {Command, CommandInput, CommandGroup, CommandItem} from "../ui/command";
import {Button} from "../ui/button";

interface IProps {
    onSelect: (time) => void
}

const TimePicker = (props: IProps) => {
    const {onSelect} = props;
    const [selectedTime, setSelectedTime] = useState("Select time");
    const [isOpen, setIsOpen] = useState(false); // State to control Popover visibility

    const times = Array.from({length: 24 * 2}, (_, index) => {
        const hours = Math.floor(index / 2).toString().padStart(2, "0");
        const minutes = (index % 2 === 0 ? "00" : "30");
        return `${hours}:${minutes}`;
    });

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time); // Set the selected time
        setIsOpen(false); // Close the Popover
        onSelect(time)
    };
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">{selectedTime}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 h-64 overflow-y-scroll p-0">
                <Command>
                    <CommandInput placeholder="Search time..."/>
                    <CommandGroup>
                        {times?.length > 0 ? (
                            times.map((time) => (
                                <CommandItem
                                    key={time}
                                    onSelect={() => {
                                        if (time) handleTimeSelect(time);
                                    }}
                                >
                                    {time}
                                </CommandItem>
                            ))
                        ) : (
                            <div className="p-2 text-center">No time options available</div>
                        )}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default TimePicker;
