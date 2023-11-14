import React, { useCallback, useRef, useState } from 'react'
import s from './style.module.css'
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice.ts';


export default function Search() {
    const dispatch = useDispatch();
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);

    const onCLickClear = () => {
        setValue('');
        dispatch(setSearchValue(''));
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 250),
        []
    );

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value)
    }

    return (
        <div className={s.root}>
            <img src="img/search_icon.svg" alt="search icon" className={s.icon} />
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={s.input}
                placeholder='Pizza search...' />
            {value && (
                <img src="img/close_icon.svg" alt="Close icon"
                    className={s.clearIcon}
                    onClick={onCLickClear}
                />
            )}

        </div>
    )
}
