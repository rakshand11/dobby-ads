const formatSize = (bytes) => {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FolderCard = ({ folder, onClick, onDelete }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-blue-300 transition group relative"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">📁</span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 truncate">{folder.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatSize(folder.totalSize)}
          </p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(folder._id);
        }}
        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 text-lg"
        title="Delete folder"
      >
        🗑️
      </button>
    </div>
  );
};

export default FolderCard;
