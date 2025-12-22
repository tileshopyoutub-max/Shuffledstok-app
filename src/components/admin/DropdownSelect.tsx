interface DropdownSelectProps<T> {
    data: T[];
    selectedItems: T[];
    setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>;
    getId: (item: T) => number | string;       // Функция для получения id
    getLabel: (item: T) => string;             // Функция для отображаемого текста
    label?: string;                             // Надпись для select
    placeholder?: string;                       // Placeholder в select
    multiple?: boolean;
}

export default function DropdownSelect<T>({
    data,
    selectedItems,
    setSelectedItems,
    getId,
    getLabel,
    label = "Select",
    placeholder = "Select an item...",
    multiple = false,
}: DropdownSelectProps<T>) {

    function handleSelectedItem(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedId = e.target.value;
        if (!selectedId) return;

        const item = data.find(d => String(getId(d)) === selectedId);
        if (!item) return;

        setSelectedItems(prev => {
            if (multiple) {
                if (prev.some(i => getId(i) === getId(item))) return prev;
                return [...prev, item];
            }
            return [item];
        });
    }

    function removeItem(id: number | string) {
        setSelectedItems(prev => prev.filter(i => getId(i) !== id));
    }

    let selectedValue: string;

    if (multiple) {
        selectedValue = "";
    } else {
        if (selectedItems[0]) {
            selectedValue = String(getId(selectedItems[0]));
        } else {
            selectedValue = "";
        }
    }

    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-text-secondary">{label}</label>
            <div className="mt-2 relative">
                <select
                    className="block w-full rounded-md border-0 py-2.5 pl-3 pr-10 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6 appearance-none cursor-pointer"
                    onChange={handleSelectedItem}
                    value={selectedValue}>
                    <option value="" disabled>{placeholder}</option>
                    {data.map(item => (
                        <option key={getId(item)} value={getId(item)}>{getLabel(item)}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
                    <span className="material-symbols-outlined">expand_more</span>
                </div>
            </div>
            {multiple && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {selectedItems.map(item => (
                        <span
                            key={getId(item)}
                            className="inline-flex items-center rounded-md bg-primary-DEFAULT/20 px-2 py-1 text-sm font-medium text-primary-DEFAULT ring-1 ring-inset ring-primary-DEFAULT/30"
                        >
                            {getLabel(item)}
                            <button
                                type="button"
                                className="group relative ml-1.5 h-3.5 w-3.5 rounded-sm hover:bg-primary-DEFAULT/20 inline-flex items-center justify-center transition-colors"
                                onClick={() => removeItem(getId(item))}
                            >
                                <span className="sr-only">Remove</span>
                                <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                        </span>
                    ))}
                </div>
            )}

        </div>
    )
}
