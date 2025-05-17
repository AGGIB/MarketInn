import React, { useState } from 'react';
import { Card, Row, Col, Form, Select, DatePicker, Button } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import DataTable from '../components/DataTable.jsx';

const { RangePicker } = DatePicker;
const { Option } = Select;

const BookingsPage = () => {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    dateRange: null,
    roomType: null,
    bookingSource: null
  });

  const roomTypeOptions = [
    { label: 'Все типы', value: '' },
    { label: 'Стандарт', value: 'standard' },
    { label: 'Делюкс', value: 'deluxe' },
    { label: 'Люкс', value: 'suite' },
    { label: 'Семейный', value: 'family' }
  ];

  const bookingSourceOptions = [
    { label: 'Все источники', value: '' },
    { label: 'Booking.com', value: 'booking' },
    { label: 'Сайт отеля', value: 'website' },
    { label: 'Expedia', value: 'expedia' },
    { label: 'Турагентства', value: 'agency' },
    { label: 'Телефон', value: 'phone' },
    { label: 'Airbnb', value: 'airbnb' }
  ];

  const handleSearch = () => {
    const values = form.getFieldsValue();
    setFilters({
      dateRange: values.dateRange,
      roomType: values.roomType || null,
      bookingSource: values.bookingSource || null
    });
  };

  const handleReset = () => {
    form.resetFields();
    setFilters({
      dateRange: null,
      roomType: null,
      bookingSource: null
    });
  };

  return (
    <div className="bookings-page">
      <Card className="filter-card" style={{ marginBottom: 20 }}>
        <Form
          form={form}
          layout="horizontal"
          onFinish={handleSearch}
        >
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item name="dateRange" label="Даты бронирования">
                <RangePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item name="roomType" label="Тип номера">
                <Select
                  placeholder="Все типы номеров"
                  allowClear
                  style={{ width: '100%' }}
                  options={roomTypeOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item name="bookingSource" label="Источник">
                <Select
                  placeholder="Все источники"
                  allowClear
                  style={{ width: '100%' }}
                  options={bookingSourceOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={4} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />} style={{ marginRight: 8 }}>
                  Поиск
                </Button>
                <Button onClick={handleReset} icon={<ReloadOutlined />}>
                  Сброс
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="table-card">
        <DataTable 
          dateRange={filters.dateRange} 
          roomType={filters.roomType} 
          bookingSource={filters.bookingSource} 
        />
      </Card>
    </div>
  );
};

export default BookingsPage; 