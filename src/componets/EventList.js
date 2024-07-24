import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEvent } from '../Store/usedRedux/eventReducer';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'; 


const EventList = () => {
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this event!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEvent(id));
        Swal.fire(
          'Deleted!',
          'Your event has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your event is not deleted',
          'error'
        );
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };

  const handleAddBtn = ()=> {
    navigate('/')
  }

  const columns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Type', selector: (row) => row.event_type, sortable: true },
    { name: 'Start Date', selector: (row) => new Date(row.startDate).toLocaleDateString(), sortable: true },
    { name: 'End Date', selector: (row) => new Date(row.endDate).toLocaleDateString(), sortable: true },
    { name: 'Description', selector: (row) => row.description, sortable: true, },
    { name: 'Handled By', selector: (row) => row.handledBy,sortable: true, },
    { name: 'Organisation', selector: (row) => row.organisation,sortable: true, },
    { name: 'Sub-events', selector: (row) => row.subEvents, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <div className=''>
          <button className='btn' onClick={() => handleEdit(row.id)}>Edit</button>
          <button className='btn2' onClick={() => handleDelete(row.id)}>Delete</button>
        </div>
      ),
      width:"20%"
    },
  ];

  return (
    <>
    <div className='add-form'><button type='submit' onClick={handleAddBtn}>Add form</button></div>
    <div className="event-list">
      <DataTable
        title="Event List"
        columns={columns}
        data={events}
        pagination
        highlightOnHover
      />
    </div>
    <div className='go-home'>
      <Link to="/">Go to Home Page</Link>
    </div>
    </>
  );
};

export default EventList;
