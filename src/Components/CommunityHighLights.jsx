

const CommunityHighlights = () => {
  const highlights = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "John Doe",
      story: "Donated 50 meals last month, reducing food waste significantly.",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Sarah Lee",
      story: "Helped distribute surplus food to 200 people in need.",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Community Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
          >
            <img
              src={highlight.image}
              alt={highlight.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h3 className="text-xl font-semibold text-center mt-4">
              {highlight.name}
            </h3>
            <p className="text-gray-600 text-center mt-2">{highlight.story}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Share Your Story
        </button>
      </div>
    </section>
  );
};

export default CommunityHighlights;