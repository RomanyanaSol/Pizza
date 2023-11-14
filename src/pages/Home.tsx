import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories/index.tsx';
import Sort, { sortList } from '../components/Sort/index.tsx';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Pagination from '../Pagination/index.tsx';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice.ts';
import { selectFilter } from '../redux/filter/selectors.ts';
import { SearchPizzaParams } from '../redux/pizza/types.ts';
import { fetchPizzas } from '../redux/pizza/asyncActions.ts';
import { selectPizzaData } from '../redux/pizza/selectors.ts';
import { useAppDispatch } from '../redux/store.ts';



export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);


  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }


  // If it was the first render, cheking URL-parameters and saving in Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find(obj => obj.sortProperty === params.sortBy);
      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.category),
        sort: sort || sortList[0]
      }));
      isSearch.current = true;
    }
  }, [])


  // If changed parameters and it was the first render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage])


  const getPizzas = async () => {

    const sortBy = sort.sortProperty;
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        search,
        currentPage: String(currentPage),
        sortBy
      }))

    window.scrollTo(0, 0)
  }

  // If it was the first render, ask for pizza
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    } else {
      isSearch.current = false
    }

  }, [categoryId, sort.sortProperty, searchValue, currentPage])


  const pizzas = items.map((items: any) => <PizzaBlock key={items.id} {...items} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);



  return (
    <div className='container'>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {
        status === 'error'
          ? <div className='content__error-info'>
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить пиццы.<br />
              Попробуйте повторить попытку позже
            </p>
          </div>
          : <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>

      }
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}
