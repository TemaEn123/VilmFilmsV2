import { memo } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import FilmCard from "../FilmCard/FilmCard";
import { Box } from "@mui/material";

import { IPopularFilm } from "../../interfaces";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3.8,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2.2,
    slidesToSlide: 1,
  },
};

interface Props {
  films: IPopularFilm[];
  name?: string;
}

const Slider = memo(({ films, name }: Props) => {
  return (
    <Box
      component="section"
      sx={{ marginBottom: "10px", cursor: "grab", overflow: "hidden" }}
    >
      <Box sx={{ fontSize: "20px", marginBottom: "10px" }}>
        {name ? name : null}
      </Box>

      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        keyBoardControl={true}
        transitionDuration={400}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {films?.map((film: IPopularFilm) => {
          return <FilmCard popular film={film} key={film.id} />;
        })}
      </Carousel>
    </Box>
  );
});

export default Slider;
