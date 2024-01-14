import { ChangeEvent, useEffect, useState } from "react";
import { Reviewer } from "../models/Reviewer";
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
import { Feedback } from "../models/Feedback";
import _ from "lodash";
import EditIcon from "@mui/icons-material/Edit";

export default function ReviewerEdit() {
  const [reviewer, setReviewer] = useState<Reviewer>({
    ReviewerId: 0,
    ReviewerName: "",
    ReviewerSurname: "",
    ArticolId: 0,
    Feedback: [],
    OrganizatorId: 0,
  });

  const [feedback, setFeedback] = useState<Feedback>({
    FeedbackId: 0,
    FeedbackStare: "",
    FeedbackContinut: "",
    ArticolId: 0,
    ReviewerId: 0,
  });

  const navigation = useNavigate();
  const { id } = useParams();

  const [isNewFeedback, setIsNewFeedback] = useState<boolean>(true);
  const [feedbackIndex, setFeedbackIndex] = useState<number>(0);

  useEffect(() => {
    if (!id) return;

    get("/reviewer/reviewer", null, id).then((r) => setReviewer(r));
  }, []);

  function onChangeReviewer(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (e.target.name === "ReviewerName")
      e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");

    setReviewer({ ...reviewer, [e.target.name]: e.target.value });
  }

  async function saveReviewer() {
    if (!id) {
      await post("/reviewer/reviewer", reviewer);
    } else {
      await put("/reviewer/reviewer", reviewer.ReviewerId, reviewer);
    }
    navigation("/Reviewer ");
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setFeedback({
      FeedbackId: 0,
      FeedbackStare: "",
      FeedbackContinut: "",
      ArticolId: id ? Number(id) : 0,
      ReviewerId: id ? Number(id) : 0,
    });
    setIsNewFeedback(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function saveFeedback() {
    handleClose();
    if (isNewFeedback) {
      const newFeedback = _.cloneDeep(reviewer.Feedback);
      newFeedback.push(feedback);
      setReviewer({ ...reviewer, Feedback: newFeedback });
    } else {
      let newFeedback = _.cloneDeep(reviewer.Feedback);
      newFeedback = newFeedback.map((a, index) =>
        index === feedbackIndex ? feedback : a
      );
      setReviewer({ ...reviewer, Feedback: newFeedback });
    }
  }

  function onChangeFeedback(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  }

  function deleteFeedback(index: number) {
    const newFeedback = _.cloneDeep(reviewer.Feedback);
    newFeedback.splice(index, 1);
    setReviewer({ ...reviewer, Feedback: newFeedback });
  }

  function editFeedback(index: number) {
    setOpen(true);
    const currentFeedback = reviewer.Feedback[index];
    setFeedback(currentFeedback);
    setIsNewFeedback(false);
    setFeedbackIndex(index);
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
          label="Numele recenzorului"
          size="small"
          value={reviewer.ReviewerName}
          onChange={onChangeReviewer}
          name="ReviewerName"
        />
        <TextField
          label="Prenumele recenzorului"
          size="small"
          value={reviewer.ReviewerSurname}
          onChange={onChangeReviewer}
          name="ReviewerSurname"
        />
      </div>
      <div>
        <TextField
          label="Articolul "
          size="small"
          value={reviewer.ArticolId}
          onChange={onChangeReviewer}
          name="ArticolId"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
      </div>
      <div>
        <TextField
          label="Organizatorul"
          size="small"
          value={reviewer.OrganizatorId}
          onChange={onChangeReviewer}
          name="OrganizatorId"
        />
      </div>

      <div>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          color="success"
          style={{ marginRight: "8px" }}
          onClick={saveReviewer}
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
        <h1> Feedback-urile reviewerului</h1>

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
            Adauga un nou feedback!
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Feedback-ul reviewerului</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
              >
                <TextField
                  label="FeedbackStare"
                  value={feedback.FeedbackStare}
                  onChange={onChangeFeedback}
                  name="FeedbackStare"
                />
                <TextField
                  label="FeedbackContinut"
                  value={feedback.FeedbackContinut}
                  onChange={onChangeFeedback}
                  name="FeedbackContinut"
                />
                <TextField
                  label="ArticolId"
                  value={feedback.ArticolId}
                  onChange={onChangeFeedback}
                  name="ArticolId"
                />

                <TextField
                  label="ReviewerId"
                  value={feedback.ReviewerId}
                  onChange={onChangeFeedback}
                  name="ReviewerId"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={saveFeedback}>Save</Button>
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
            Lista de feedback-uri
          </Typography>
        </Box>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Feedback Stare</TableCell>
                <TableCell>Feedback Continut</TableCell>
                <TableCell>Articol</TableCell>
                <TableCell>Reviewer</TableCell>

                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviewer.Feedback.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.FeedbackStare}</TableCell>
                  <TableCell>{row.FeedbackContinut}</TableCell>
                  <TableCell>{row.ArticolId}</TableCell>
                  <TableCell>{row.ReviewerId}</TableCell>

                  <TableCell>
                    <Button
                      startIcon={<EditIcon />}
                      color="success"
                      onClick={() => editFeedback(index)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<CancelIcon />}
                      color="error"
                      onClick={() => deleteFeedback(index)}
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
