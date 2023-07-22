import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Typography} from "@mui/material";
import JSONData from "./JSONData";

const SecondPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user details from local storage
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      // Redirect back to the first page if data not found
      navigate("/", {
        state: {message: "Please enter your details first."},
      });
    }
  }, [navigate]);

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom>
        User Details
      </Typography>

      <JSONData />
    </Container>
  );
};

export default SecondPage;
