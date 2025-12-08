interface ButtonProps {
    name: string;
    text: string;
}

export default function Button({name, text}: ButtonProps){
    return(
        <button className="flex min-w-[84px] items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
            <span className="material-symbols-outlined text-base">{name}</span>
            <span className="truncate">{text}</span>
        </button>
    )
}