
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const BecomeVolunteerForm = () => {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('/api/volunteer-request', values);
      alert('Your volunteer request has been submitted successfully!');
      resetForm();
    } catch (error) {
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Become a Volunteer</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                  Phone
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                  Why do you want to volunteer?
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default BecomeVolunteerForm;