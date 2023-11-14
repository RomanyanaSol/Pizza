import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pizza, PizzaSliceState, Status } from "./types.ts";
import { fetchPizzas } from "./asyncActions.ts";

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.items = action.payload;
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
}
);


export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;