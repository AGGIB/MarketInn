import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Hotel as HotelIcon,
  Event as EventIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';

// Room types and display names
const rooms = ['standard', 'deluxe', 'suite', 'executive'];
const roomDisplayNames = {
  standard: 'Стандартный',
  deluxe: 'Делюкс',
  suite: 'Люкс',
  executive: 'Представительский'
};

// Booking sources and display names
const sources = ['website', 'phone', 'agency', 'walkin'];
const sourceDisplayNames = {
  website: 'Веб-сайт',
  phone: 'Телефон',
  agency: 'Агентство',
  walkin: 'Личное посещение'
};

// Booking statuses and display names
const statuses = ['confirmed', 'pending', 'canceled', 'completed'];
const statusDisplayNames = {
  confirmed: 'Подтверждено',
  pending: 'Ожидание',
  canceled: 'Отменено',
  completed: 'Завершено'
};

// Status colors for chips
const statusColors = {
  confirmed: 'success',
  pending: 'warning',
  canceled: 'error',
  completed: 'info'
};

// Initial form values
const initialFormValues = {
  guestName: '',
  roomType: 'standard',
  checkIn: '',
  checkOut: '',
  adults: 1,
  children: 0,
  source: 'website',
  price: '',
  status: 'pending'
};

const DataTable = ({ data, onAdd, onUpdate, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [orderBy, setOrderBy] = useState('checkIn');
  const [order, setOrder] = useState('asc');

  // Filter and sort data based on search term and sorting
  const filteredData = React.useMemo(() => {
    return data
      .filter(booking =>
        booking.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roomDisplayNames[booking.roomType]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.checkIn?.includes(searchTerm) ||
        booking.checkOut?.includes(searchTerm) ||
        statusDisplayNames[booking.status]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (order === 'asc') {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });
  }, [data, searchTerm, order, orderBy]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleOpenAddDialog = () => {
    setFormValues(initialFormValues);
    setIsEdit(false);
    setOpen(true);
  };

  const handleOpenEditDialog = (booking) => {
    setFormValues({
      guestName: booking.guestName,
      roomType: booking.roomType,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      adults: booking.adults,
      children: booking.children,
      source: booking.source,
      price: booking.price,
      status: booking.status
    });
    setCurrentBooking(booking);
    setIsEdit(true);
    setOpen(true);
  };

  const handleOpenDeleteDialog = (booking) => {
    setCurrentBooking(booking);
    setDeleteConfirmOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValues(initialFormValues);
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
    if (isEdit) {
      onUpdate({ ...formValues, id: currentBooking.id });
    } else {
      onAdd(formValues);
    }
    handleClose();
  };

  const handleDelete = () => {
    onDelete(currentBooking.id);
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
    return formValues.guestName &&
      formValues.checkIn &&
      formValues.checkOut &&
      formValues.adults &&
      formValues.price;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, justifyContent: 'space-between' }}>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Управление бронированиями
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
            >
              Добавить
            </Button>
          </Box>
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'guestName'}
                    direction={orderBy === 'guestName' ? order : 'asc'}
                    onClick={() => handleRequestSort('guestName')}
                  >
                    Имя гостя
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'roomType'}
                    direction={orderBy === 'roomType' ? order : 'asc'}
                    onClick={() => handleRequestSort('roomType')}
                  >
                    Тип номера
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'checkIn'}
                    direction={orderBy === 'checkIn' ? order : 'asc'}
                    onClick={() => handleRequestSort('checkIn')}
                  >
                    Дата заезда
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'checkOut'}
                    direction={orderBy === 'checkOut' ? order : 'asc'}
                    onClick={() => handleRequestSort('checkOut')}
                  >
                    Дата выезда
                  </TableSortLabel>
                </TableCell>
                <TableCell>Гости</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'source'}
                    direction={orderBy === 'source' ? order : 'asc'}
                    onClick={() => handleRequestSort('source')}
                  >
                    Источник
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'price'}
                    direction={orderBy === 'price' ? order : 'asc'}
                    onClick={() => handleRequestSort('price')}
                  >
                    Цена
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleRequestSort('status')}
                  >
                    Статус
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking) => (
                <TableRow
                  hover
                  key={booking.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {booking.guestName}
                  </TableCell>
                  <TableCell>{roomDisplayNames[booking.roomType]}</TableCell>
                  <TableCell>{booking.checkIn}</TableCell>
                  <TableCell>{booking.checkOut}</TableCell>
                  <TableCell>{booking.adults} взр. {booking.children > 0 ? `+ ${booking.children} дет.` : ''}</TableCell>
                  <TableCell>{sourceDisplayNames[booking.source]}</TableCell>
                  <TableCell>{booking.price} ₸</TableCell>
                  <TableCell>
                    <Chip
                      label={statusDisplayNames[booking.status]}
                      color={statusColors[booking.status]}
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
      </Paper>

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