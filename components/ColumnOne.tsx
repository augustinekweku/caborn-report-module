
type PropType = {
    selectedColumn: number,
    onClick: () => void;
}

export const ColumnOne = ({selectedColumn, onClick}:PropType) => {
    return <>
        
    <svg width="288" height="120" viewBox="0 0 288 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={onClick}>
<rect x="1" y="1" width="286" height="118" rx="11" fill="#F7F7F7" stroke={selectedColumn === 1 ? '#333333':''} strokeWidth="2"/>
<rect x="24" y="32" width="240" height="56" rx="6" fill="white"/>
</svg>



    </>
}