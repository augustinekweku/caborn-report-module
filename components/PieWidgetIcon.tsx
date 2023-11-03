type PropType = {
    selectedWidgetIcon: string,
    onClick: () => void;
}

export const PieWidgetIcon = ({selectedWidgetIcon, onClick}:PropType) => {
    return <>
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
<rect width="180" height="180" rx="12" fill="#F7F7F7"/>
<path d="M106.853 89.9998C113.787 89.9998 116.667 87.3332 114.107 78.5865C112.373 72.6932 107.307 67.6265 101.413 65.8932C92.6667 63.3332 90 66.2132 90 73.1465V80.8265C90 87.3332 92.6667 89.9998 98 89.9998H106.853Z" stroke="#808080" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M111.334 97.2C108.854 109.547 97.0138 118.507 83.5471 116.32C73.4405 114.693 65.3071 106.56 63.6538 96.4534C61.4938 83.04 70.4005 71.2 82.6938 68.6934" stroke="#808080" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
<rect x="1.5" y="1.5" width="177" height="177" rx="10.5" stroke={selectedWidgetIcon === 'chart'? "#333333": ''} strokeWidth="3"/>
            
</svg>

    </>
}