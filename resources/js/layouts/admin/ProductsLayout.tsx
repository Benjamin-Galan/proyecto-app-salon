interface Props {
    header?: React.ReactNode;
    children: React.ReactNode;
}

export default function ProductsLayout({ header, children }: Props) {
    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-6">
                {header}
            </div>

            <div>
                {children}
            </div>
        </div>
    )
}