import {TextField, Button, Typography, Box} from "@mui/material";

const UserForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can handle form submission here and collect the data
    // For demonstration purposes, we are just logging the form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Adjust the height to center the element on the screen
      }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" component="h2" gutterBottom>
          User Information
        </Typography>

        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Phone number"
          name="phone"
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
