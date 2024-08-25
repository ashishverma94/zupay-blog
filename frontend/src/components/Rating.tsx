const Rating = ({ rating }: { rating: number }) => {
  const starCount = 5;

  return (
    <div className="flex">
      {[...Array(starCount)].map((_, index) => (
        <span
          key={index}
          className={`text-3xl mx-1 transition-colors duration-200 ${
            index < rating
              ? "bg-clip-text text-transparent bg-gradient-to-r from-[#ef7b4d] via-yellow-300 to-[yellow]"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
