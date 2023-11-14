import React, { memo } from 'react';


type CategoriesProps = {
    value: number;
    onChangeCategory: (idx: number) => void;
}

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Covered']

const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {


    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, idx) => (
                        <li
                            key={idx}
                            onClick={() => onChangeCategory(idx)}
                            className={value === idx ? 'active' : ''} >
                            {categoryName}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
})

export default Categories;