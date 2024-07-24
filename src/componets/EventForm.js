import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { addEvent, updateEvent } from "../Store/usedRedux/eventReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const EventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const events = useSelector((state) => state.events.events);

  const formik = useFormik({
    initialValues: {
      name: "",
      event_type: "",
      startDate: "",
      endDate: "",
      description: "",
      handledBy: "",
      organisation: "",
      subEvents: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Event name is required"),
      description: Yup.string().required("Description is required"),
      handledBy: Yup.string().required("Handled by is required"),
      event_type: Yup.string().required("Please select type"),
      organisation: Yup.string().required("Organisation is required"),
      subEvents: Yup.string().required("subEvents is required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref("startDate"), "End date must be after start date"),
    }),
    onSubmit: async (values) => {
      const formattedEvent = {
        ...values,
        startDate: values.startDate.toString(),
        endDate: values.endDate.toString(),
      };

      try {
        if (id) {
          dispatch(updateEvent(parseInt(id), formattedEvent));
          Swal.fire({
            icon: "success",
            title: "Event updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          dispatch(addEvent(formattedEvent));
          Swal.fire({
            icon: "success",
            title: "Event added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        navigate("/events");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error occurred. Please try again later.",
        });
      }
    },
  });

  useEffect(() => {
    if (id) {
      const eventToEdit = events.find((event) => event.id === parseInt(id));
      if (eventToEdit) {
        formik.setValues({
          ...eventToEdit,
          startDate: new Date(eventToEdit.startDate),
          endDate: new Date(eventToEdit.endDate),
        });
      }
    }
  }, [id]);

  return (
    <div className="bg-color">
    <form onSubmit={formik.handleSubmit} className="event-form">
      <div className="title-form"><h1>Add Event Form</h1></div>
      
      <div className="">
        <label>Event Name:</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </div>
      <div>
        <label>Event Type:</label>
        <select
          name="event_type"
          value={formik.values.event_type}
          onChange={formik.handleChange}
        >
          <option value="">Select</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="general">General</option>
          <option value="children">Children</option>
          <option value="school">School</option>
        </select>
        {formik.touched.event_type && formik.errors.event_type ? (
          <div className="error">{formik.errors.event_type}</div>
        ) : null}
      </div>
      <div>
        <label>Event Start Date:</label>
        <DatePicker
          selected={formik.values.startDate}
          onChange={(date) => formik.setFieldValue("startDate", date)}
          minDate={new Date()}
        />
        {formik.touched.startDate && formik.errors.startDate ? (
          <div className="error">{formik.errors.startDate}</div>
        ) : null}
      </div>
      <div>
        <label>Event End Date:</label>
        <DatePicker
          selected={formik.values.endDate}
          onChange={(date) => formik.setFieldValue("endDate", date)}
          minDate={formik.values.startDate}
        />
        {formik.touched.endDate && formik.errors.endDate ? (
          <div className="error">{formik.errors.endDate}</div>
        ) : null}
      </div>
      <div>
        <label>Event Description:</label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="error">{formik.errors.description}</div>
        ) : null}
      </div>
      <div>
        <label>Handled By:</label>
        <input
          type="text"
          name="handledBy"
          value={formik.values.handledBy}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.handledBy && formik.errors.handledBy ? (
          <div className="error">{formik.errors.handledBy}</div>
        ) : null}
      </div>
      <div>
        <label>Organisation:</label>
        <input
          type="text"
          name="organisation"
          value={formik.values.organisation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.organisation && formik.errors.organisation ? (
          <div className="error">{formik.errors.organisation}</div>
        ) : null}
      </div>
      <div>
        <label>Total Sub-events:</label>
        <input
          type="number"
          name="subEvents"
          value={formik.values.subEvents}
          onChange={formik.handleChange}
        />
         {formik.touched.subEvents && formik.errors.subEvents ? (
          <div className="error">{formik.errors.subEvents}</div>
        ) : null}
      </div>
      <button type="submit">{id ? "Update Event" : "Save Event"}</button>
    </form>
    </div>
  );
};

export default EventForm;
