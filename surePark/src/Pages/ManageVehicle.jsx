import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addUserVehicles, deleteUserVehicles, editUserVehicles } from '../feature/userSlice';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ManageVehicle = () => {

  const dispatch = useDispatch();

  const { currentUser, error } = useSelector((state) => state.user);

  const [vehicles, setVehicles] = useState([{
    no: ""
  }]);
  const [editIndex, setEditIndex] = useState(null);

  // Validation schema
  const validationSchema = Yup.object({
    no: Yup.string()
      .matches(/^[A-Z]{2}\/\d{1,2}\/[A-Z]{1,2}\/\d{4}$/, "Invalid vehicle number format")
      .required("Vehicle number is required"),
  });

  useEffect(() => {
    if (currentUser?.vehicles) {
      console.log(currentUser);
      setVehicles(currentUser.vehicles);
    }
  }, [currentUser]);

  const handleAdd = (values, { setFieldValue, resetForm }) => {
    if (!values.no.trim()) return;
    console.log(editIndex);
    if (editIndex == null) {
      dispatch(addUserVehicles({ vehicleNo: values.no }));
      resetForm();
    } else {
      dispatch(editUserVehicles({ vehicleNo: values.no, index: editIndex }));
      resetForm();
      setEditIndex(null);
    }
  };

  const handleEdit = (index, setFieldValue) => {
    setFieldValue("no", vehicles[index].no);
    setEditIndex(index);
  };

  const handleDelete = (deleteIndex) => {
    dispatch(deleteUserVehicles({ index: deleteIndex }));
  };


  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-content py-10">
        <h1 className="text-2xl font-bold mb-6">Vehicle Management</h1>

        <Formik
          initialValues={{ no: "" }}
          validationSchema={validationSchema}
          onSubmit={handleAdd}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-5">
              <div>
                <Field
                  type="text"
                  name="no"
                  placeholder="Enter No:(eg:TN/07/AB/1234)"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage name="no" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-500 transition"
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>


              {/* Table */}
              <div className="w-full max-w-2xl mt-6">
                <table className="w-full border-collapse shadow-lg bg-white rounded-lg overflow-hidden">
                  <thead className="bg-orange-200">
                    <tr>
                      <th className="p-3 text-left">#</th>
                      <th className="p-3 text-left">Vehicle Number</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((v, i) => (
                      <tr key={i} className="border-b hover:bg-orange-50">
                        <td className="p-3">{i + 1}</td>
                        <td className="p-3">{v.no}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(i, setFieldValue)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(i)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {vehicles.length === 0 && (
                      <tr>
                        <td colSpan="3" className="p-3 text-center text-gray-500">
                          No vehicles added yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Form>
          )}
        </Formik>




      </div>
    </>
  )
}

export default ManageVehicle
