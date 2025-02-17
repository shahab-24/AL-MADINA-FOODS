import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const BecomeVolunteerForm = () => {
  const axiosSecure = useAxiosSecure();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axiosSecure.post("http://localhost:3000/volunteer-request", values, { withCredentials: true });
      Swal.fire({
        icon: "success",
        title: "Thank you for volunteering! 🎉",
        showConfirmButton: false,
        timer: 2000,
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops! Something went wrong. Please try again.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-500 to-blue-500 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg transform transition duration-500 hover:scale-105 mt-20">
        <h2 className="text-xl lg:text-2xl font-bold text-center text-gray-900 mb-6">
          🙌 Become a Volunteer
        </h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Field name="name" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

              <Field name="email" type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

              <Field name="phone" placeholder="Your Phone" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />

              <Field as="textarea" name="message" rows="4" placeholder="Why do you want to volunteer?" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />

              <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default BecomeVolunteerForm;
