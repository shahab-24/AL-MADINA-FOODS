import { useNavigate } from 'react-router-dom';

const CallToActionVolunteering = () => {
    const navigate = useNavigate()

    const handleVolunteerClick = () => {
        navigate('/becomeVolunteer')
    }

    return (
        <section className="bg-blue-100 py-12 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-700 mb-4">
                    Join Us as a Volunteer
                </h2>
                <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl mb-6">
                    Help us make a difference by distributing food, creating awareness, or contributing in other impactful ways.
                    Together, we can reduce food waste and feed those in need.
                </p>
                <button
                    onClick={handleVolunteerClick}
                    className="px-8 py-4 bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Become a Volunteer
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white shadow-xl rounded-lg p-8 text-center transform hover:scale-105 transition duration-300">
                    <h3 className="text-3xl font-bold text-green-600">200+</h3>
                    <p className="text-gray-600">Volunteers Joined</p>
                </div>
                <div className="bg-white shadow-xl rounded-lg p-8 text-center transform hover:scale-105 transition duration-300">
                    <h3 className="text-3xl font-bold text-green-600">5000+</h3>
                    <p className="text-gray-600">Meals Delivered</p>
                </div>
                <div className="bg-white shadow-xl rounded-lg p-8 text-center transform hover:scale-105 transition duration-300">
                    <h3 className="text-3xl font-bold text-green-600">100+</h3>
                    <p className="text-gray-600">Communities Helped</p>
                </div>
            </div>
        </section>
    );
};

export default CallToActionVolunteering;
