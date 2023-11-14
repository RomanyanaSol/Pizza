import React from 'react'
import s from './style.module.css'

export default function NotFoundBlock() {
    return (
        <div className={s.root}>
            <h1 >
                <span>😕</span>
                <br />
                Nothing found
            </h1 >
            <p className={s.description}>Unfortunately, this page is not available in our online store</p>
        </div>
    )
}
