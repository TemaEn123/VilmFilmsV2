import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IFilters } from "../../interfaces";

const initialState: { filters: IFilters } = {
  filters: {
    ["genres.name"]: undefined,
    sortField: undefined,
    sortType: undefined,
    year: undefined,
    ["countries.name"]: undefined,
    type: undefined,
    page: "1",
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilters: (
      state,
      action: PayloadAction<[string, string | undefined] | boolean>
    ) => {
      if (Array.isArray(action.payload)) {
        if (action.payload[0] === "sortField") {
          if (action.payload[1] === undefined) {
            state.filters = {
              ...state.filters,
              sortType: undefined,
              [action.payload[0]]: action.payload[1],
            };
          } else {
            state.filters = {
              ...state.filters,
              sortType: state.filters.sortType ? state.filters.sortType : "-1",
              [action.payload[0]]: action.payload[1],
            };
          }
        } else {
          state.filters = {
            ...state.filters,
            [action.payload[0]]: action.payload[1],
          };
        }
      } else {
        state.filters = {
          ...state.filters,
          sortType: action.payload ? "1" : "-1",
        };
      }
    },
  },
});

export const { changeFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
