import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {TextField, Button, Container, Typography} from "@mui/material";

const FirstPage = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save user details to local storage
    localStorage.setItem("userData", JSON.stringify(formData));
    // Redirect to the second page
    navigate("/second");
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}>
      {location.state && location.state.message && (
        <Typography variant="h6" color="error" gutterBottom>
          {location.state.message}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" component="h2" gutterBottom>
          Fill Up Your Information
        </Typography>

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Phone number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FirstPage;
