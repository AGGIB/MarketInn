import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  TextField, 
  Box, 
  IconButton,
  MenuItem,
  Tooltip,
  Chip,
  TablePagination,
  InputAdornment
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Search as SearchIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Hotel as HotelIcon,
  AttachMoney as AttachMoneyIcon 
} from '@mui/icons-material';

const initialFormState = {
  guestName: '',
  roomType: 'standard',
  checkIn: '',
  checkOut: '',
  adults: 1,
  children: 0,
  source: 'website',
  price: '',
  status: 'confirmed'
};

const rooms = ['standard', 'deluxe', 'suite', 'family'];
const roomDisplayNames = {
  'standard': 'Стандартный',
  'deluxe': 'Делюкс',
  'suite': 'Люкс',
  'family': 'Семейный'
};

const sources = ['website', 'booking', 'expedia', 'airbnb', 'phone', 'agency'];
const sourceDisplayNames = {
  'website': 'Сайт отеля',
  'booking': 'Booking.com',
  'expedia': 'Expedia',
  'airbnb': 'Airbnb',
  'phone': 'Телефон',
  'agency': 'Турагентства'
};

const statuses = ['confirmed', 'pending', 'canceled', 'completed'];
const statusDisplayNames = {
  'confirmed': 'Подтверждено',
  'pending': 'Ожидание',
  'canceled': 'Отменено',
  'completed': 'Завершено'
};

const statusColors = {
  'confirmed': 'success',
  'pending': 'warning',
  'canceled': 'error',
  'completed': 'default'
};

const DataTable = ({ data, onAdd, onUpdate, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [formValues, setFormValues] = useState(initialFormState);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = data.filter(booking => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.guestName?.toLowerCase().includes(searchLower) ||
      roomDisplayNames[booking.roomType]?.toLowerCase().includes(searchLower) ||
      sourceDisplayNames[booking.source]?.toLowerCase().includes(searchLower) ||
      statusDisplayNames[booking.status]?.toLowerCase().includes(searchLower) ||
      booking.checkIn?.includes(searchTerm) ||
      booking.checkOut?.includes(searchTerm)
    );
  });

  const handleOpenAddDialog = () => {
    setFormValues(initialFormState);
    setIsEdit(false);
    setOpen(true);
  };

  const handleOpenEditDialog = (booking) => {
    setCurrentBooking(booking);
    setFormValues({
      guestName: booking.guestName || '',
      roomType: booking.roomType || 'standard',
      checkIn: booking.checkIn || '',
      checkOut: booking.checkOut || '',
      adults: booking.adults || 1,
      children: booking.children || 0,
      source: booking.source || 'website',
      price: booking.price || '',
      status: booking.status || 'confirmed'
    });
    setIsEdit(true);
    setOpen(true);
  };

  const handleOpenDeleteDialog = (booking) => {
    setCurrentBooking(booking);
    setDeleteConfirmOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentBooking(null);
  };

  const handleDeleteClose = () => {
    setDeleteConfirmOpen(false);
    setCurrentBooking(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (isEdit && currentBooking) {
      onUpdate(currentBooking.id, formValues);
    } else {
      onAdd(formValues);
    }
    handleClose();
  };

  const handleDelete = () => {
    if (currentBooking) {
      onDelete(currentBooking.id);
    }
    handleDeleteClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const validateForm = () => {
    return (
      formValues.guestName.trim() !== '' &&
      formValues.checkIn !== '' &&
      formValues.checkOut !== '' &&
      formValues.price !== ''
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2">
          Список бронирований
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Поиск..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
          >
            Добавить
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: '65vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Гость</TableCell>
              <TableCell>Тип номера</TableCell>
              <TableCell>Дата заезда</TableCell>
              <TableCell>Дата выезда</TableCell>
              <TableCell>Гости</TableCell>
              <TableCell>Источник</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((booking) => (
              <TableRow key={booking.id} hover>
                <TableCell>{booking.guestName}</TableCell>
                <TableCell>{roomDisplayNames[booking.roomType] || booking.roomType}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>{`${booking.adults + (booking.children || 0)} (${booking.adults} / ${booking.children || 0})`}</TableCell>
                <TableCell>{sourceDisplayNames[booking.source] || booking.source}</TableCell>
                <TableCell>{booking.price}₸</TableCell>
                <TableCell>
                  <Chip 
                    label={statusDisplayNames[booking.status] || booking.status} 
                    color={statusColors[booking.status] || 'default'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Редактировать">
                    <IconButton onClick={() => handleOpenEditDialog(booking)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Удалить">
                    <IconButton onClick={() => handleOpenDeleteDialog(booking)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    Нет данных для отображения
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
      />

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEdit ? 'Редактирование бронирования' : 'Добавление нового бронирования'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Имя гостя"
              name="guestName"
              value={formValues.guestName}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              label="Тип номера"
              name="roomType"
              value={formValues.roomType}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HotelIcon />
                  </InputAdornment>
                ),
              }}
            >
              {rooms.map((room) => (
                <MenuItem key={room} value={room}>
                  {roomDisplayNames[room]}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Дата заезда"
                name="checkIn"
                type="date"
                value={formValues.checkIn}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Дата выезда"
                name="checkOut"
                type="date"
                value={formValues.checkOut}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Взрослые"
                name="adults"
                type="number"
                value={formValues.adults}
                onChange={handleInputChange}
                inputProps={{ min: 1 }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Дети"
                name="children"
                type="number"
                value={formValues.children}
                onChange={handleInputChange}
                inputProps={{ min: 0 }}
              />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              select
              label="Источник бронирования"
              name="source"
              value={formValues.source}
              onChange={handleInputChange}
            >
              {sources.map((source) => (
                <MenuItem key={source} value={source}>
                  {sourceDisplayNames[source]}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Цена"
              name="price"
              type="number"
              value={formValues.price}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
                endAdornment: <InputAdornment position="end">₸</InputAdornment>,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              label="Статус"
              name="status"
              value={formValues.status}
              onChange={handleInputChange}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {statusDisplayNames[status]}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
            disabled={!validateForm()}
          >
            {isEdit ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteClose}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить бронирование для гостя "{currentBooking?.guestName}"?<br />
            Это действие нельзя будет отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataTable; 