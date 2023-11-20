const id = require('uuid');

const preFileFix = (new Date().getTime()).toString() + '_' + id.v4() + '_';

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/images/postsThumbnails/');
  },
  filename: function (req, file, callback) {
    callback(null, `${preFileFix}${file.originalname}`);
  }
});
const uploadProfileThumb = multer({storage: storage});

module.exports = uploadProfileThumb;
