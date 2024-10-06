import Typography from "@mui/material/Typography";
import FavSymbolBreadCrumb from "./FavSymbolBreadCrumb";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import SymbolEditList from "./SymbolEditList";
const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function FavSymbolHeader() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <SymbolEditList open={open} />
        </Box>
      </Modal>
      <Box sx={{ marginBottom: "1rem" }}>
        <FavSymbolBreadCrumb />
        <Grid container spacing={2} justifyContent="space-between">
          <Grid>
            <Typography variant="h4">Favorites</Typography>
          </Grid>
          <Grid>
            <Button variant="outlined" onClick={handleOpen}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
