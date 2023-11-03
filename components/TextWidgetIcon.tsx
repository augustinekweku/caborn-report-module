type PropType = {
    selectedWidgetIcon: string,
    onClick: () => void;
}


export const TextWidgetIcon = ({selectedWidgetIcon, onClick}:PropType) => {
    return <>
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={onClick}>
<rect x="1.5" y="1.5" width="177" height="177" rx="10.5" fill="#F7F7F7"/>
<path d="M76.548 122.084H85.668V64.196H68.772V75.62H61.86V59.492H117.732V75.62H110.82V64.196H93.924V122.084H103.044V126.5H76.548V122.084Z" fill="#666666"/>
<rect x="1.5" y="1.5" width="177" height="177" rx="10.5" stroke={selectedWidgetIcon === 'text'? "#333333": ''} strokeWidth="3"/>
</svg>

    </>
}