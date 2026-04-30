import { useEffect, useState, useCallback } from "react";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import FolderCard from "../components/FolderCard.jsx";
import ImageCard from "../components/ImageCard.jsx";
import CreateFolderModal from "../components/CreateFolderModal.jsx";
import UploadImageModal from "../components/UploadImageModal.jsx";

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showUploadImage, setShowUploadImage] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchContents = useCallback(async () => {
    setLoading(true);
    try {
      const params = currentFolder ? { parentId: currentFolder.id } : {};

      const [foldersRes, imagesRes] = await Promise.all([
        api.get("/folder", { params }),
        currentFolder
          ? api.get("/image", { params: { folderId: currentFolder.id } })
          : Promise.resolve({ data: { images: [] } }),
      ]);

      setFolders(foldersRes.data.folders);
      setImages(imagesRes.data.images);
    } catch (err) {
      console.error("Failed to fetch contents", err);
    } finally {
      setLoading(false);
    }
  }, [currentFolder]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  const openFolder = (folder) => {
    setCurrentFolder({ id: folder._id, name: folder.name });
    setBreadcrumbs((prev) => [...prev, { id: folder._id, name: folder.name }]);
  };

  const navigateTo = (index) => {
    if (index === -1) {
      setCurrentFolder(null);
      setBreadcrumbs([]);
    } else {
      const crumb = breadcrumbs[index];
      setCurrentFolder({ id: crumb.id, name: crumb.name });
      setBreadcrumbs((prev) => prev.slice(0, index + 1));
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (!confirm("Delete this folder and all its contents?")) return;
    try {
      await api.delete(`/folder/${folderId}`);
      setFolders((prev) => prev.filter((f) => f._id !== folderId));
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to delete folder");
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!confirm("Delete this image?")) return;
    try {
      await api.delete(`/image/${imageId}`);
      setImages((prev) => prev.filter((img) => img._id !== imageId));
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <button
            onClick={() => navigateTo(-1)}
            className="hover:text-blue-600 font-medium transition"
          >
            My Drive
          </button>
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.id} className="flex items-center gap-2">
              <span>/</span>
              <button
                onClick={() => navigateTo(index)}
                className="hover:text-blue-600 font-medium transition"
              >
                {crumb.name}
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setShowCreateFolder(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            📁 New Folder
          </button>
          {currentFolder && (
            <button
              onClick={() => setShowUploadImage(true)}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
            >
              🖼️ Upload Image
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : (
          <>
            {folders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Folders
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {folders.map((folder) => (
                    <FolderCard
                      key={folder._id}
                      folder={folder}
                      onClick={() => openFolder(folder)}
                      onDelete={handleDeleteFolder}
                    />
                  ))}
                </div>
              </div>
            )}

            {images.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Images
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((image) => (
                    <ImageCard
                      key={image._id}
                      image={image}
                      onDelete={handleDeleteImage}
                    />
                  ))}
                </div>
              </div>
            )}

            {folders.length === 0 && images.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <span className="text-6xl mb-4">📂</span>
                <p className="text-lg font-medium">This folder is empty</p>
                <p className="text-sm mt-1">Create a folder to get started</p>
              </div>
            )}
          </>
        )}
      </div>

      {showCreateFolder && (
        <CreateFolderModal
          parentId={currentFolder?.id}
          onClose={() => setShowCreateFolder(false)}
          onCreated={(folder) => setFolders((prev) => [folder, ...prev])}
        />
      )}

      {showUploadImage && currentFolder && (
        <UploadImageModal
          folderId={currentFolder.id}
          onClose={() => setShowUploadImage(false)}
          onUploaded={(image) => setImages((prev) => [image, ...prev])}
        />
      )}
    </div>
  );
};

export default Dashboard;
