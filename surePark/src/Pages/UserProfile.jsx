import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserProfile = () => {
  const {currentUser} = useSelector((state) => state.user); // Redux selector
  const dispatch = useDispatch();

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Min 6 chars").required("Password is required"),
  });

  return (
    <section className="min-h-screen ">
    <div className="max-w-lg mt-4 mx-auto p-6 shadow-md bg-orange-200 rounded">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {/* Formik Form */}
      <Formik
        initialValues={{
          name: currentUser.name,
          email: currentUser.email,
          password: currentUser.password,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Updated values:", values);
          // dispatch(updateUser(values)) → your Redux action
        }}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label className="block font-semibold">Name</label>
              <Field name="name" className="border p-2 w-full rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-semibold">Email</label>
              <Field name="email" type="email" className="border p-2 w-full rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-semibold">Password</label>
              <Field name="password" type="password" className="border p-2 w-full rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </Form>
        )}
      </Formik>

      {/* Extra Info Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Vehicles</h3>
        <ul className="list-disc ml-6">
          {currentUser.vehicles.map((v, i) => (
            <li key={i}>{v.no}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-4">Favorite Slots</h3>
        <ul className="list-disc ml-6">
          {currentUser.favoriteSlot.map((slot, i) => (
            <li key={i}>
              {slot.location} — Floor {slot.floorId}, Slot {slot.slotsId}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </section>
  );
};

export default UserProfile;
