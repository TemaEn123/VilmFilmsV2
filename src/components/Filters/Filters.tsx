import { useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { changeFilters } from "../../redux/slices/filtersSlice";
import { RootState } from "../../redux/store";

import useThrottle from "../../helpers/hooks/useThrottle";

import FilterItem from "../../ui/FilterItem/FilterItem";
import { Box, Button, SvgIcon } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { dataForFilters } from "../../data";

const Filters = () => {
  const [sortType, setSortType] = useState<boolean>(false);

  const [throttle, setThrottle] = useState<boolean>(false);

  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) => state.filters.filters);

  useThrottle(() => setThrottle(false), 700);

  const handleClick = useCallback(() => {
    setThrottle(true);
    if (filters.sortField !== undefined) {
      if (Number(filters.page) > 1) {
        dispatch(changeFilters(["page", "1"]));
      }
      dispatch(changeFilters(!sortType));
    }
    setSortType((prev) => !prev);
  }, [dispatch, filters.sortField, filters.page, sortType]);

  return (
    <Box
      sx={{
        marginBottom: "10px",
        display: "flex",
        alignItems: "flex-end",
        color: "#fff",
        flexWrap: "wrap",
      }}
    >
      <Button
        onClick={handleClick}
        disabled={throttle}
        sx={{
          padding: "0px",
          minWidth: "unset",
          margin: "0 10px 10px 0",
          color: "#fff",
          transform: !sortType ? "rotate(180deg)" : "rotate(0)",
          transition: "all 0.3s ease 0s",
          "&:disabled": {
            color: "#fff",
            opacity: 0.7,
          },
        }}
      >
        <SvgIcon sx={{ fontSize: "24px" }}>
          <ArrowDownwardIcon />
        </SvgIcon>
      </Button>
      {dataForFilters.map((item, i) => {
        return <FilterItem key={i} item={item} />;
      })}
    </Box>
  );
};

export default Filters;
