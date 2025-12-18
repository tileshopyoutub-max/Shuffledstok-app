interface AdminPageHeaderProps {
    title: string;
    action?: React.ReactNode;
}

export default function AdminPageHeader({title, action}:AdminPageHeaderProps){
    return(
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-text-main-dark text-4xl font-black leading-tight tracking-[-0.033em]">{title}</h1>
            {action}
        </div>
    )
}