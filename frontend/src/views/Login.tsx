// export default function Login(){
//     return (
//         <h1>Login page</h1>
//     )
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const roles = ["Organizator", "Autor", "Reviewer"];

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aici ar trebui să efectuezi autentificarea, de exemplu, cu o cerere către server

    // După autentificare, poți redirecționa utilizatorul pe pagina corespunzătoare
    switch (role.toLowerCase()) {
      case "organizator":
        navigate("/Organizator");
        break;
      case "autor":
        navigate("/Autor");
        break;
      case "reviewer":
        navigate("/Reviewer");
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bine ai venit la PlannerIt!
      </Typography>
      <FormControl sx={{ width: 300, marginBottom: 2 }}>
        <InputLabel id="role-label">Selectează rolul</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          value={role}
          label="Selectează rolul"
          onChange={(e) => setRole(e.target.value as string)}
        >
          {roles.map((r) => (
            <MenuItem key={r} value={r.toLowerCase()}>
              {r}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Numele de utilizator"
        variant="outlined"
        margin="normal"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Parola"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleLogin}
        sx={{
          marginTop: 2,
          backgroundColor: "#9370DB",
          "&:hover": { backgroundColor: "#8A2BE2" },
        }}
      >
        Login
      </Button>
    </Box>
  );
}
