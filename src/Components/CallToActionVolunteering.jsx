
import { useNavigate } from 'react-router-dom';

const CallToActionVolunteering = () => {
    const navigate = useNavigate()

    const handleVolunteerClick =()=> {
        navigate('/becomeVolunteer')
    }
  return (
    <section className="bg-blue-100 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Join Us as a Volunteer</h2>
        <p className="text-gray-700 text-lg mb-6">
          Help us make a difference by distributing food, creating awareness, or contributing in other
          impactful ways. Together, we can reduce food waste and feed those in need.
        </p>
        <button onClick={handleVolunteerClick} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Become a Volunteer
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">200+</h3>
          <p className="text-gray-600">Volunteers Joined</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">5000+</h3>
          <p className="text-gray-600">Meals Delivered</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">100+</h3>
          <p className="text-gray-600">Communities Helped</p>
        </div>
      </div>
    </section>
  );
};

export default CallToActionVolunteering;