const ImageCard = ({ image, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition group relative">
      <img
        src={image.url}
        alt={image.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 truncate">
          {image.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {(image.size / 1024).toFixed(1)} KB
        </p>
      </div>

      <button
        onClick={() => onDelete(image._id)}
        className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 shadow"
        title="Delete image"
      >
        🗑️
      </button>
    </div>
  );
};

export default ImageCard;
