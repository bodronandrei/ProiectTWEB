import { ChangeEvent, useEffect, useState } from "react";
import { Autor } from "../models/Autor";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router-dom";
import { post, get, put } from "../api/Calls";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Articol } from "../models/Articol";
import _ from "lodash";
import EditIcon from "@mui/icons-material/Edit";

export default function AutorEdit() {
  const [autor, setAutor] = useState<Autor>({
    AutorId: 0,
    AutorName: "",
    AutorSurname: "",
    ConferintaId: 0,
    Articol: [],
  });

  const [articol, setArticol] = useState<Articol>({
    ArticolId: 0,
    ArticolTitle: "",
    ArticolStare: "",
    Continut: "",
    ConferintaId: 0,
    AutorId: 0,
    ReviewerId: 0,
    FeedbackId: 0,
  });

  const navigation = useNavigate();
  const { id } = useParams();

  const [isNewArticol, setIsNewArticol] = useState<boolean>(true);
  const [articolIndex, setArticolIndex] = useState<number>(0);

  useEffect(() => {
    if (!id) return;

    get("/autor/autor", null, id).then((r) => setAutor(r));
  }, []);

  function onChangeAutor(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (e.target.name === "AutorrName") {
      e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
    }

    setAutor({ ...autor, [e.target.name]: e.target.value });
  }

  async function saveAutor() {
    if (!id) {
      await post("/autor/autor", autor);
    } else {
      await put("/autor/autor", autor.AutorId, autor);
    }
    navigation("/Autor");
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setArticol({
      ArticolId: 0,
      ArticolTitle: "",
      ArticolStare: "",
      Continut: "",
      ConferintaId: id ? Number(id) : 0,
      AutorId: id ? Number(id) : 0,
      ReviewerId: id ? Number(id) : 0,
      FeedbackId: id ? Number(id) : 0,
    });
    setIsNewArticol(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function saveArticol() {
    handleClose();
    if (isNewArticol) {
      const newArticol = _.cloneDeep(autor.Articol);
      newArticol.push(articol);
      setAutor({ ...autor, Articol: newArticol });
    } else {
      let newArticol = _.cloneDeep(autor.Articol);
      newArticol = newArticol.map((a, index) =>
        index === articolIndex ? articol : a
      );
      setAutor({ ...autor, Articol: newArticol });
    }
  }

  function onChangeArticol(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setArticol({ ...articol, [e.target.name]: e.target.value });
  }

  function deleteArticol(index: number) {
    const newArticol = _.cloneDeep(autor.Articol);
    newArticol.splice(index, 1);
    setAutor({ ...autor, Articol: newArticol });
  }

  function editArticol(index: number) {
    setOpen(true);
    const currentArticol = autor.Articol[index];
    setArticol(currentArticol);
    setIsNewArticol(false);
    setArticolIndex(index);
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
    >
      <div>
        <TextField
          label="Numele autorului"
          size="small"
          value={autor.AutorName}
          onChange={onChangeAutor}
          name="AutorName"
        />
        <TextField
          label="Prenumele autorului"
          size="small"
          value={autor.AutorSurname}
          onChange={onChangeAutor}
          name="AutorSurname"
        />
        <TextField
          label="Conferinta "
          size="small"
          value={autor.ConferintaId}
          onChange={onChangeAutor}
          name="ConferintaId"
        />
      </div>

      <div>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          color="success"
          style={{ marginRight: "8px" }}
          onClick={saveAutor}
        >
          Save
        </Button>
        <Button
          startIcon={<CancelIcon />}
          variant="contained"
          color="error"
          onClick={() => navigation(-1)}
        >
          Cancel
        </Button>
      </div>

      <div>
        <h1>Articolele autorului</h1>

        <div>
          <Button
            startIcon={<AddCircleIcon />}
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              backgroundColor: "#9370DB", 
              color: "white", 
              "&:hover": {
                backgroundColor: "#8A2BE2", 
              },
            }}
          >
            Adauga un nou articol!
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Articolul autorului</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
              >
                <TextField
                  label="ArticolTitle"
                  value={articol.ArticolTitle}
                  onChange={onChangeArticol}
                  name="ArticolTitle"
                />

                <TextField
                  label="ArticolStare"
                  value={articol.ArticolStare}
                  onChange={onChangeArticol}
                  name="ArticolStare"
                />

                <TextField
                  label="Continut"
                  value={articol.Continut}
                  onChange={onChangeArticol}
                  name="Continut"
                />

                <TextField
                  label="ConferintaId"
                  value={articol.ConferintaId}
                  onChange={onChangeArticol}
                  name="ConferintaId"
                />
                <TextField
                  label="AutorId"
                  value={articol.AutorId}
                  onChange={onChangeArticol}
                  name="AutorId"
                />
                <TextField
                  label="ReviewerId"
                  value={articol.ReviewerId}
                  onChange={onChangeArticol}
                  name="ReviewerId"
                />
                <TextField
                  label="FeedbackId"
                  value={articol.FeedbackId}
                  onChange={onChangeArticol}
                  name="FeedbackId"
                />
              </Box>
            </DialogContent>

            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "lavender",
                color: "white",
                "&:hover": { backgroundColor: "lavender" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={saveArticol}
              sx={{
                backgroundColor: "lavender",
                color: "white",
                "&:hover": { backgroundColor: "lavender" },
              }}
            >
              Save
            </Button>
          </Dialog>
        </div>
        <Box sx={{
            backgroundColor: "lightblue",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "left",
              fontStyle: "italic",
              fontWeight: "bold",
              color: "navy",
            }}
          >
            Lista de articole
          </Typography>
        </Box>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Titlul articolului</TableCell>
                <TableCell>Starea articolului</TableCell>
                <TableCell>Continutul articolului </TableCell>
                <TableCell>Conferinta </TableCell>
                <TableCell>Autor </TableCell>
                <TableCell>Reviewer </TableCell>
                <TableCell>Feedback </TableCell>

                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {autor.Articol.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.ArticolTitle}</TableCell>
                  <TableCell>{row.ArticolStare}</TableCell>
                  <TableCell>{row.Continut}</TableCell>
                  <TableCell>{row.ConferintaId}</TableCell>
                  <TableCell>{row.AutorId}</TableCell>
                  <TableCell>{row.ReviewerId}</TableCell>
                  <TableCell>{row.FeedbackId}</TableCell>

                  <TableCell>
                    <Button
                      startIcon={<EditIcon />}
                      color="success"
                      onClick={() => editArticol(index)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<CancelIcon />}
                      color="error"
                      onClick={() => deleteArticol(index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
}
