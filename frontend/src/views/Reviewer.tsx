import { ChangeEvent, useEffect, useState } from "react";
import { get, remove } from "../api/Calls";
import { Reviewer } from "../models/Reviewer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from "../components/TablePaginationActions";
import { PaginationResponse } from "../models/PaginationResponse";
import { Box, Button, TableHead, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { reviewerFilterDto } from "../models/reviewerFIlterDto";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import _ from "lodash";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ReviewersList() {

  const [reviewers, setReviewers] = useState<PaginationResponse<Reviewer>>({ count: 0, rows: [] })
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0)
  const [reviewerFilter, setReviewerFilter] = useState<reviewerFilterDto>({
    reviewerName: "",
    reviewerSurname: "",
    take: 5,
    skip: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    getReviewers(reviewerFilter).then(d => { setReviewers(d); })
  }, [])

  async function getReviewers(reviewerFilter: reviewerFilterDto) {
    return (await get("/reviewer/reviewer", reviewerFilter)) as PaginationResponse<Reviewer>;
  }

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    let newFilter = _.cloneDeep(reviewerFilter);
    newFilter.skip = newPage;
    await filter(newFilter);
    setReviewerFilter(newFilter);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let take = parseInt(event.target.value, 10)
    setRowsPerPage(take);
    setPage(0);

    let newFilter = _.cloneDeep(reviewerFilter);
    newFilter.take = take;
    newFilter.skip = 0;
    await filter(newFilter);
    setReviewerFilter(newFilter);
  };

  function newReviewer() {
    navigate("/NewReviewer")
  }

  function onChangeFilter(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setReviewerFilter({ ...reviewerFilter, [e.target.name]: e.target.value });
  }

  async function filterReviewer() {
    setPage(0)
    let revFilter = _.cloneDeep(reviewerFilter);
    revFilter.skip = 0
    filter(revFilter)
  }

  async function clearFilters() {
    let newFilter = { reviewerName: "", reviewerSurname: "", skip: 0, take: 5 };
    setPage(0)
    setRowsPerPage(5);
    setReviewerFilter(newFilter);
    filter(newFilter)
  }

  async function filter(filter: reviewerFilterDto) {
    let filterReviewers = await getReviewers(filter);
    setReviewers(filterReviewers);
  }

  async function deleteReviewer(reviewerId: number){
    await remove("/reviewer/reviewer", reviewerId);
    let ret = await getReviewers(reviewerFilter);
    setReviewers(ret);
  }

  async function editReviewer(reviewerId: number){
    navigate(`/EditReviewer/${reviewerId}`);
  }

  return (
    <div>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        style={{ marginBottom: '30px' }}
      >

        <h1>Filters</h1>
        <div>

          <TextField
            label="Numele recenzorului:"
            value={reviewerFilter.reviewerName}
            onChange={onChangeFilter}
            name="reviewerName"
          />

          <TextField
            label="Prenumele recenzorului:"
            value={reviewerFilter.reviewerSurname}
            onChange={onChangeFilter}
            name="reviewerSurname"
          />

        </div>

        <div>
          <Button
            style={{ marginRight: "8px" }}
            startIcon={<FilterAltIcon />}
            variant="contained"
            onClick={filterReviewer}
            sx={{
              backgroundColor: "#9370DB", 
              borderRadius: "20px", 
              minWidth: "100px", 
              padding: "10px 20px", 
              "&:hover": {
                backgroundColor: "#8A2BE2", 
              },
            }}
          >
            Filter
          </Button>

          <Button
            startIcon={<ClearIcon />}
            variant="contained"
            onClick={clearFilters}
            sx={{
              backgroundColor: "#FF6347", 
              borderRadius: "20px", 
              minWidth: "100px", 
              padding: "10px 20px", 
              "&:hover": {
                backgroundColor: "#FF4500", 
              },
            }}
          >
            Clear Filters
          </Button>
        </div>


      </Box>

      <Button
  style={{ marginBottom: '20px' }}
  startIcon={<AddCircleIcon />}
  variant="contained"
  onClick={newReviewer}
  sx={{
    backgroundColor: "#800080",
    borderRadius: "20px",
    minWidth: "100px",
    padding: "10px 20px",
    '&:hover': {
      backgroundColor: "#4B0082",
    },
  }}
>
  Adauga Feedback!
</Button>

      <Box sx={{ backgroundColor:'lavender', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
        <Typography variant="subtitle1" sx={{ textAlign: 'left', fontStyle: 'italic', fontWeight: 'bold', color: 'purple' }}>
        Lista reviewerilor
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Numele reviewerului</TableCell>
              <TableCell>Prenumele reviewerului</TableCell>
              <TableCell>Articolul analizat</TableCell>
              <TableCell>Organizatorul</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewers.rows.map((row) => (
              <TableRow key={row.ReviewerId}>
                <TableCell align="left">
                  {row.ReviewerName}
                </TableCell>
                <TableCell align="left">
                  {row.ReviewerSurname}
                </TableCell>
                <TableCell align="left">
                  {row.ArticolId}
                </TableCell>
                
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    color="success"
                    onClick={() => editReviewer(row.ReviewerId)}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    startIcon={<CancelIcon />}
                    color="error"
                    onClick={() => deleteReviewer(row.ReviewerId)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={reviewers.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}