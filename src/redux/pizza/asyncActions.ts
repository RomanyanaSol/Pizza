import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { category, search, currentPage, sortBy } = params
        const { data } = await axios.get<Pizza[]>(
            `https://652824c4931d71583df1efde.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&${search}`
        )
        return data;
    });