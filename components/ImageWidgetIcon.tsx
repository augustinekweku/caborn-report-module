type PropType = {
    selectedWidgetIcon: string,
    onClick: () => void;
}


export const ImageWidgetIcon = ({selectedWidgetIcon, onClick}:PropType) => {
    return <>
   <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={onClick}>
<rect width="180" height="180" rx="12" fill="#F7F7F7"/>
<path d="M81.9997 116.667H97.9997C111.333 116.667 116.666 111.334 116.666 98.0006V82.0006C116.666 68.6673 111.333 63.334 97.9997 63.334H81.9997C68.6663 63.334 63.333 68.6673 63.333 82.0006V98.0006C63.333 111.334 68.6663 116.667 81.9997 116.667Z" stroke="#808080" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M82.0003 84.6667C84.9458 84.6667 87.3337 82.2789 87.3337 79.3333C87.3337 76.3878 84.9458 74 82.0003 74C79.0548 74 76.667 76.3878 76.667 79.3333C76.667 82.2789 79.0548 84.6667 82.0003 84.6667Z" stroke="#808080" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M65.1201 108.534L78.2668 99.7075C80.3734 98.2941 83.4134 98.4541 85.3068 100.081L86.1868 100.854C88.2668 102.641 91.6268 102.641 93.7068 100.854L104.8 91.3341C106.88 89.5475 110.24 89.5475 112.32 91.3341L116.667 95.0675" stroke="#808080" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
<rect x="1.5" y="1.5" width="177" height="177" rx="10.5" stroke={selectedWidgetIcon === 'image'? "#333333": ''} strokeWidth="3"/>
            
</svg>



    </>
}