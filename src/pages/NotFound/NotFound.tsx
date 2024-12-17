import { Box, Container } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const NotFound = () => {
  return (
    <>
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
          <Box
            sx={{
              width: "100%",
              fontSize: "50px",
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            404
          </Box>
        </main>
        <Footer />
      </Container>
    </>
  );
};

export default NotFound;
