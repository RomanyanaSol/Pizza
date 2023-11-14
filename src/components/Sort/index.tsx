import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../../redux/filter/slice.ts';
import { Sort, SortPropertyEnum } from '../../redux/filter/types.ts';


type SortItem = {
    name: string;
    sortProperty: SortPropertyEnum;
}

type PopupClick = MouseEvent & {
    composedPath: Node[];
}

export const sortList: SortItem[] = [
    { name: 'rating', sortProperty: SortPropertyEnum.RATING },
    { name: 'price', sortProperty: SortPropertyEnum.PRICE },
    { name: 'ABC', sortProperty: SortPropertyEnum.TITLE }
];

type SortPopupProps = {
    value: Sort;
}


const SortPopup: React.FC<SortPopupProps> = memo(({ value }) => {

    const dispatch = useDispatch();
    const sortRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);

    const onClickListItem = (obj: SortItem) => {
        dispatch(setSort(obj))
        setOpen(false);
    }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as PopupClick;
            if (sortRef.current && _event.composedPath().indexOf(sortRef.current) === -1) {
                setOpen(false);
            }
        }

        document.body.addEventListener('click', handleClickOutside);

        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);


    
    return (
        <div className="sort" ref={sortRef}>
            <div
                className="sort__label">
                <img src="img/arrow-top.svg" alt="arrow top" />
                <b>Sort by:</b>
                <span onClick={() => setOpen(!open)}>{value.name}</span>
            </div>
            {
                open && <div className="sort__popup">
                    <ul>
                        {
                            sortList.map((obj, i) => (
                                <li
                                    key={i}
                                    onClick={() => onClickListItem(obj)}
                                    className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                                    {obj.name}
                                </li>
                            ))}
                    </ul>
                </div>
            }
        </div>
    )
})

export default SortPopup;
