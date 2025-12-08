interface SearchInputProps {
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({value, placeholder, onChange}: SearchInputProps){
    return(
        <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-text-secondary-dark flex bg-component-dark items-center justify-center pl-4 rounded-l-lg">
                    <span className="material-symbols-outlined">search</span>
                </div>
                <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none 
                        overflow-hidden rounded-r-lg text-text-main-dark focus:outline-0 focus:ring-2
                        focus:ring-primary/50 border-none bg-component-dark h-full placeholder:text-text-secondary-dark
                        px-4 text-base font-normal leading-normal" 
                    type="search" 
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}/>
            </div>
        </label>
    )
}