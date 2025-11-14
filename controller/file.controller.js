import File from '../model/file.model.js';

// A. Upload a new resource
export const uploadResource = async (req, res) => {
  try {
    const { groupId } = req.body; // So we know which group it's for
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const newFile = new File({
      filename: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      uploadedBy: req.user.id,
      group: groupId
    });
    
    await newFile.save();
    // (Here you would create a notification for the group)
    res.status(201).json({ message: "File uploaded!", file: newFile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// B. Get all files for a group
export const getGroupFiles = async (req, res) => {
  try {
    const { groupId } = req.params;
    const files = await File.find({ group: groupId })
      .populate('uploadedBy', 'fullname');
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// C. Download a single file
export const downloadFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    // This securely sends the file for download
    res.download(file.filePath, file.filename);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Add to file.route.js (or message.route.js) ---
// POST /api/files - Upload a file (use multer middleware)
// GET /api/files/:groupId - Get all files for a group
// GET /api/files/download/:fileId - Download a file