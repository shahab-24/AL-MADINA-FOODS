import Swal from "sweetalert2";

const CommunityHighlights = () => {
  const highlights = [
    {
      id: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhUo-dTLtzt5zMyqhXJTTXdyKoIOVaQBQoJA&s",
      name: "John Doe",
      story: "Donated 50 meals last month, reducing food waste significantly.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      name: "Sarah Lee",
      story: "Helped distribute surplus food to 200 people in need.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      name: "Michael Smith",
      story: "Organized a food drive that collected over 1,000 canned goods.",
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0yz57OMdpEi8CLKNjAdM3Oj21qitTDc2qbg&s",
      name: "Emily Davis",
      story: "Volunteered 40 hours at the local shelter, providing meals and support.",
    },
    {
      id: 5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3MhdaszRKFhv1qrpSU8U5sLdzhGDbHBBPg&s",
      name: "David Johnson",
      story: "Started a community composting initiative to reduce food waste.",
    },
    {
      id: 6,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCdLCpxwti9WTG5SmOOXmlUQu7eSlpuHXsnA&s",
      name: "Sophia Brown",
      story: "Educated 500 students on sustainable food practices through workshops.",
    },
  ];

  const handleShareStoryClick = () => {
    Swal.fire({
      title: "Share Your Story!",
      text: "Would you like to share your contribution to the community?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, share it!",
      cancelButtonText: "Not now",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Thank You!", "We appreciate your willingness to share your story!", "success");
      }
    });
  };

  return (
    <section className="bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 py-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        🌟 Community Highlights 🌟
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="bg-white shadow-lg rounded-xl p-6 transform transition hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={highlight.image}
              alt={highlight.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-400 shadow-md transform transition duration-300 hover:scale-110"
            />
            <h3 className="text-2xl font-semibold text-center mt-4 text-gray-800">
              {highlight.name}
            </h3>
            <p className="text-gray-600 text-center mt-3">{highlight.story}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={handleShareStoryClick}
          className="px-4 py-2 lg:px-6 lg:py-3  text-white rounded-lg text-sm lg:text-lg font-semibold shadow-md transition duration-300 transform bg-green-600 hover:bg-green-700 hover:shadow-lg "
        >
          ✨ Share Your Story ✨
        </button>
      </div>
    </section>
  );
};

export default CommunityHighlights;
