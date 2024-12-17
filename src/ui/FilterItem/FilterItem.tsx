import { memo, useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeFilters } from "../../redux/slices/filtersSlice";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { IDataForFiltersItem } from "../../interfaces";

interface Props {
  item: IDataForFiltersItem;
}

const FilterItem = memo(({ item }: Props) => {
  const filters = useSelector((state: RootState) => state.filters.filters);

  const [name, setName] = useState<string | undefined>(
    filters[item.slugName as keyof typeof filters]
      ? filters[item.slugName as keyof typeof filters]
      : ""
  );

  const dispatch = useDispatch();

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setName(event.target.value as string);
      if (Number(filters.page) > 1) {
        dispatch(changeFilters(["page", "1"]));
      }
      if (event.target.value === "") {
        dispatch(changeFilters([item.slugName, undefined]));
      } else {
        dispatch(changeFilters([item.slugName, event.target.value]));
      }
    },
    [dispatch, filters.page, item.slugName]
  );

  return (
    <FormControl
      variant="standard"
      sx={{
        margin: "0 10px 10px 0",
        minWidth: "100px",
        "& svg": {
          fill: "#fff",
        },
        "& .MuiSelect-iconOpen": {
          fill: "#1976d2",
        },
        "& .css-3yxd3g-MuiInputBase-root-MuiInput-root-MuiSelect-root::before":
          {
            borderBottom: "1px solid #fff",
          },
        "& .css-3yxd3g-MuiInputBase-root-MuiInput-root-MuiSelect-root:hover:not(.Mui-disabled, .Mui-error):before":
          {
            borderBottom: "1px solid #fff",
          },
      }}
    >
      <InputLabel sx={{ color: "#fff" }}>{item.name}</InputLabel>
      <Select sx={{ color: "#fff" }} value={name} onChange={handleChange}>
        {item.data.map((item, i) => (
          <MenuItem value={item.slug} key={i}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default FilterItem;
