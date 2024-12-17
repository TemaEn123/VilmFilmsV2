import { useEffect } from "react";

import { Outlet, useLocation } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { changeFilters } from "../redux/slices/filtersSlice";
import { RootState } from "../redux/store";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Container } from "@mui/material";

const AppLayout = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) => state.filters.filters);

  useEffect(() => {
    if (filters.page !== "1") {
      dispatch(changeFilters(["page", "1"]));
    }
  }, [location]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "0 15px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default AppLayout;
