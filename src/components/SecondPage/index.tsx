import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Container, Typography} from "@mui/material";
import FetchListData from "./FetchListData";
import DepartmentList from "./DepartmentList";

const SecondPage = () => {
  const navigate = useNavigate();
  const [isShowFetchListData, setIsShowFetchListData] = useState(true);

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

  const handleShowData = () => setIsShowFetchListData(!isShowFetchListData);

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom>
        <Button variant="contained" onClick={handleShowData}>
          {isShowFetchListData
            ? "Show Department Data"
            : "Show Fetch List Of Data"}
        </Button>
      </Typography>

      {isShowFetchListData ? <FetchListData /> : <DepartmentList />}
    </Container>
  );
};

export default SecondPage;
