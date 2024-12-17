import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import { createSearchParams, useLocation, useNavigate } from "react-router";

import { useGetFilmsBySearchQuery } from "../../redux/services/filmsApi";

import { useDebounce } from "../../helpers/hooks/useDebounce";

import { Box, Button, Input, Typography } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LoadingIcon from "../../ui/LoadingIcon/LoadingIcon";
import SearchFilm from "../../ui/SearchFilm/SearchFilm";

interface Props {
  handleTextInput: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  searchValue: string;
  setOpenSearch: () => void;
  openSearch: boolean;
}

const Search = memo(
  ({ handleTextInput, searchValue, setOpenSearch, openSearch }: Props) => {
    const [showSearchList, setShowSearchList] = useState<boolean>(false);

    const debouncedSearch = useDebounce(searchValue);

    const location = useLocation();

    const skip: boolean =
      debouncedSearch.length < 1 || location.pathname === "/search";

    useEffect(() => {
      if (debouncedSearch.length < 1) {
        setShowSearchList(false);
      } else {
        setShowSearchList(true);
      }
    }, [debouncedSearch]);

    useEffect(() => {
      const documentClick = (e: Event) => {
        if (e.target && window.innerWidth >= 600) {
          if (!(e.target as HTMLElement).closest(".search")) {
            setShowSearchList(false);
          }
        }
      };

      document.addEventListener("click", documentClick);

      return () => {
        document.removeEventListener("click", documentClick);
      };
    }, []);

    const {
      data: films,
      error,
      isFetching,
    } = useGetFilmsBySearchQuery([debouncedSearch, "1"], {
      skip,
    });

    const filterFilms = films?.docs.filter(
      (film) => film.poster && film.poster.url && film.name
    );

    const navigate = useNavigate();

    const handleSubmit = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowSearchList(false);
        navigate({
          pathname: "/search",
          search: createSearchParams({
            title: searchValue,
          }).toString(),
        });
      },
      [navigate, searchValue]
    );

    if (error) {
      console.error(error);
    }

    return (
      <>
        <Box
          onSubmit={(e) => handleSubmit(e)}
          component="form"
          className="search"
          sx={
            openSearch
              ? {
                  background: "#111",
                  padding: "10px",
                  position: "absolute",
                  top: "100%",
                  width: "100%",
                  right: "0",
                  height: "calc(100vh - 61px)",
                  display: "flex",
                  flex: "1 1 100%",
                  zIndex: 1,
                  overflow: "auto",
                }
              : {
                  display: { xs: "none", sm: "flex" },
                  flex: "1 1 100%",
                  position: "relative",
                }
          }
        >
          <Input
            value={searchValue}
            onFocus={() => setShowSearchList(debouncedSearch.length > 0)}
            onChange={(e) => handleTextInput(e)}
            sx={{
              color: "#fff",
              width: "100%",
              border: "2px solid #222",
              borderRight: "none",
              padding: "0 5px 0 10px",
              textDecoration: "none",
              height: "30px",
            }}
            placeholder="Поиск..."
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "#222",
              borderRadius: "0px",
              color: "#888",
              height: "30px",
            }}
          >
            Поиск
          </Button>
          {showSearchList && location.pathname !== "/search" && (
            <Box
              sx={{
                position: "absolute",
                left: "0",
                top: { xs: "50px", sm: "125%" },
                maxHeight: { xs: "unset", sm: "400px" },
                width: "100%",
                backgroundColor: "#1d1d1c",
                padding: "10px",
                zIndex: "1001",
                overflow: "auto",
                textAlign: "center",
              }}
            >
              {isFetching ? (
                <LoadingIcon m="0px" />
              ) : (filterFilms as [])?.length ? (
                filterFilms
                  ?.slice(0, 9)!
                  .map((film) => <SearchFilm film={film} key={film.id} />)
              ) : (
                <Typography component="span" sx={{ fontSize: "14px" }}>
                  Не найдено
                </Typography>
              )}
            </Box>
          )}
        </Box>
        <Box
          onClick={setOpenSearch}
          component="button"
          sx={{
            background: "none",
            color: "#fff",
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
          }}
        >
          <SvgIcon sx={{ fontSize: "28px" }}>
            {openSearch ? <CloseIcon /> : <SearchIcon />}
          </SvgIcon>
        </Box>
      </>
    );
  }
);

export default Search;
