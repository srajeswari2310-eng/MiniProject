import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { paymentConfirm, reset } from "../feature/parkingSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  cardNumber: Yup.string()
  .length(16,"Card Number must be 16 digit")  
  .matches(/^\d+$/, "Card Number must contain only digits")
  .required("Card number is required"),
  expiryDate: Yup.string()
  .length(4,"Must be 4 digit")  
  .matches(/^\d+$/, "Expiry date digits only")
  .required("Expiry date is required"),
  cvv: Yup.string()
  .length(3,"Must be 3 digit")  
  .matches(/^\d+$/, "CVV digits only")
  .required("CVV is required"),
  nameOnCard: Yup.string().required("Name on card is required"),
});

const PaymentPage = () => {

  const { reservationDetails } = useSelector((state) => state.parking);
  const { currentUser } = useSelector((state) => state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handelCancel = () => {
    if(confirm("Are You sure to cancel booking"))
    {
       dispatch(reset({ currentUser }));
        navigate("/home/parking");
    }
   }

   const handelSubmit = () => {
    if(confirm("Confirm Booking"))
    {
      dispatch(paymentConfirm({paymentMade: true, currentUser:currentUser}));
       dispatch(reset({ currentUser }));
      navigate("/home/parking");
    }
   }

  return (
    <div className="min-h-screen bg-orange-100 flex flex-col items-center px-4 py-10 ">
      {/* Heading */}
      <div className="text-start max-w-3xl mx-auto p-10">
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r p-2 from-teal-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
          Manage Vehicles
        </h2>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Formik Form */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          {/* Reservation Summary */}

          <h3 className="text-lg font-semibold mb-3 text-center">Reservation Summary</h3>
          <div className="items-start gap-5 flex flex-col text-2xl">
            <p><strong>Plan: </strong> {reservationDetails?.plan}</p>
            <p><strong>Vechile No: </strong> {reservationDetails?.userVehicleNo}</p>
            <p><strong>Start Date: </strong> {reservationDetails?.startDate}</p>
            {reservationDetails?.plan == "longTerm" || reservationDetails?.plan == "monthly" && (
              <p><strong>End Date: </strong> {reservationDetails?.endDate}</p>
            )}
            {reservationDetails?.plan == "shortTerm" && (
              <>
                <p><strong>Start Time: </strong> {reservationDetails?.startTime}</p>
                <p><strong>End Time: </strong> {reservationDetails?.endTime}</p>
              </>
            )}
          </div>

        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 ">
          {/* Payment Form */}
          <Formik
            initialValues={{ cardNumber: "", expiryDate: "", cvv: "", nameOnCard: "" }}
            validationSchema={validationSchema}
            onSubmit={() => {
              handelSubmit();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4" > 
                <div>
                  <label className="block mb-1">Card Number</label>
                  <Field name="cardNumber" className="border p-2 w-full" />
                  <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-1">Expiry Date</label>
                  <Field name="expiryDate" placeholder="MMYY" className="border p-2 w-full" />
                  <ErrorMessage name="expiryDate" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-1">CVV</label>
                  <Field name="cvv" type="password" className="border p-2 w-full" />
                  <ErrorMessage name="cvv" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-1">Name on Card</label>
                  <Field name="nameOnCard" className="border p-2 w-full" />
                  <ErrorMessage name="nameOnCard" component="div" className="text-red-500 text-sm" />
                </div>

                <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Confirm & Pay
                </button>

                <button type="button" onClick={handelCancel} className="bg-blue-600 text-white ms-2 px-4 py-2 rounded">
                  Cancel Payment
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
