import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetFilmsQuery } from "../../redux/services/filmsApi";

import Categories from "../../components/Categories/Categories";
import Films from "../../components/Films/Films";
import Filters from "../../components/Filters/Filters";
import Popular from "../../components/Popular/Popular";

import useWasPageChange from "../../helpers/hooks/useWasPageChange";

const Home = () => {
  const filters = useSelector((state: RootState) => state.filters.filters);

  const isFirstPageRef = useWasPageChange();

  const {
    data: films,
    error,
    isFetching,
  } = useGetFilmsQuery(
    isFirstPageRef.current ? { ...filters, page: "1" } : filters
  );

  return (
    <>
      <Popular />
      <Categories />
      <Filters />
      <Films
        filters={filters}
        films={films}
        error={error}
        isFetching={isFetching}
      />
    </>
  );
};

export default Home;
