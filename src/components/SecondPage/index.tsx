import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { Container, Grid, Typography} from "@mui/material";
import FetchListData from "./FetchListData";
import DepartmentList from "./DepartmentList";

const SecondPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user details from local storage
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      // Redirect back to the first page if data not found
      navigate("/", {
        state: {message: "Please enter your details."},
      });
    }
  }, [navigate]);

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom>
        <h5>Department Data and Fetch List of Data</h5>
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DepartmentList />
        </Grid>
        <Grid item xs={8}>
          <FetchListData />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SecondPage;
