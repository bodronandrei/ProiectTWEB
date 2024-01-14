import { ChangeEvent, useEffect, useState } from "react";
import { Organizator } from "../models/Organizator";
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
import { Conferinta } from "../models/Conferinta";
import _ from "lodash";
import EditIcon from "@mui/icons-material/Edit";

export default function OrganizatorEdit() {
  const [organizator, setOrganizator] = useState<Organizator>({
    OrganizatorId: 0,
    OrganizatorName: "",
    OrganizatorSurName: "",
    Conferinta: [],
    Reviewer: [],
  });

  const [conferinta, setConferinta] = useState<Conferinta>({
    ConferintaId: 0,
    ConferintaName: "",
    ConferintaDate: new Date(),
    ConferintaLocatie: "",
    OrganizatorId: 0,
  });

  const navigation = useNavigate();
  const { id } = useParams();

  const [isNewConferinta, setIsNewConferinta] = useState<boolean>(true);
  const [conferintaIndex, setConferintaIndex] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    try{
    get("/organizator/organizator", null, id).then((r) => setOrganizator(r));
    } catch(error){}
  }, []);

  function onChangeOrganizator(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (e.target.name === "OrganizatorName") {
      e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
    }

    setOrganizator({ ...organizator, [e.target.name]: e.target.value });
  }

  async function saveOrganizator() {
    if (!id) {
      try{
      await post("/organizator/organizator", organizator);
      }catch(error){}
    } else {
      try{
      await put("/organizator/organizator", organizator.OrganizatorId, organizator);
      } catch(error){}
    }
    navigation("/Organizator");
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setConferinta({
      ConferintaId: 0,
      ConferintaName: "",
      ConferintaDate: new Date(),
      ConferintaLocatie: "",
      OrganizatorId: id ? Number(id) : 0,
    });
    setIsNewConferinta(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function saveConferinta() {
    handleClose();
    if (isNewConferinta) {
      const newConferinta = _.cloneDeep(organizator.Conferinta);
      newConferinta.push(conferinta);
      setOrganizator({ ...organizator, Conferinta: newConferinta });
    } else {
      let newConferinta = _.cloneDeep(organizator.Conferinta);
      newConferinta = newConferinta.map((a, index) =>
        index === conferintaIndex ? conferinta : a
      );
      setOrganizator({ ...organizator, Conferinta: newConferinta });
    }
  }

  function onChangeConferinta(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setConferinta({ ...conferinta, [e.target.name]: e.target.value });
  }

  function deleteConferinta(index: number) {
    const newConferinta = _.cloneDeep(organizator.Conferinta);
    newConferinta.splice(index, 1);
    setOrganizator({ ...organizator, Conferinta: newConferinta });
  }

  function editConferinta(index: number) {
    setOpen(true);
    const currentConferinta = organizator.Conferinta[index];
    setConferinta(currentConferinta);
    setIsNewConferinta(false);
    setConferintaIndex(index);
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
          label="Numele organizatorului"
          size="small"
          value={organizator.OrganizatorName}
          onChange={onChangeOrganizator}
          name="OrganizatorName"
        />
        <TextField
          label="Prenumele organizatorului"
          size="small"
          value={organizator.OrganizatorSurName}
          onChange={onChangeOrganizator}
          name="OrganizatorSurName"
        />
      </div>

      <div>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          color="success"
          style={{ marginRight: "8px" }}
          onClick={saveOrganizator}
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
        <h1>Conferintele organizatorului</h1>

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
            Adauga o noua conferinta!
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Conferinta organizatorului</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
              >
                <TextField
                  label="ConferintaName"
                  value={conferinta.ConferintaName}
                  onChange={onChangeConferinta}
                  name="ConferintaName"
                />

                <TextField
                  label="ConferintaDate"
                  value={conferinta.ConferintaDate}
                  onChange={onChangeConferinta}
                  name="ConferintaDate"
                />

                <TextField
                  label="ConferintaLocatie"
                  value={conferinta.ConferintaLocatie}
                  onChange={onChangeConferinta}
                  name="ConferintaLocatie"
                />

                <TextField
                  label="OrganizatorId"
                  value={conferinta.OrganizatorId}
                  onChange={onChangeConferinta}
                  name="OrganizatorId"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: "lavender",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "lavender",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={saveConferinta}
                sx={{
                  backgroundColor: "lavender", 
                  color: "white",
                  "&:hover": {
                    backgroundColor: "lavender",
                  },
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Box
          sx={{
            backgroundColor: "lightblue",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "left",
              fontStyle: "italic",
              fontWeight: "bold",
              color: "navy",
            }}
          >
            Lista de conferinte
          </Typography>
        </Box>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Numele Conferintei</TableCell>
                <TableCell>Data Conferintei</TableCell>
                <TableCell>Locatia Conferintei</TableCell>
                <TableCell>Organizatorul </TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizator.Conferinta.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.ConferintaName}</TableCell>
                  <TableCell>{row.ConferintaDate.toLocaleString()}</TableCell>
                  <TableCell>{row.ConferintaLocatie}</TableCell>
                  <TableCell> {row.OrganizatorId}</TableCell>

                  <TableCell>
                    <Button
                      startIcon={<EditIcon />}
                      color="success"
                      onClick={() => editConferinta(index)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<CancelIcon />}
                      color="error"
                      onClick={() => deleteConferinta(index)}
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
