const multer = require('multer');
const sharp = require('sharp');
const mkdirp = require('mkdirp-promise');
const fs = require('fs');
const path = require('path');
const Profile = require('../models/Profile');
const Twit = require('../models/Twit');
const asyncHandler = require('../middleware/async');

const multerStorage = multer.memoryStorage();

const imagePath = './client/public/img/avatars/';

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image - please upload an image file.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

// ************ PUT ROUTE ************
// Route: PUT /api/v1/:username/photo
// Uploads a photo
// requires authentication

// Uploads the avatar
exports.uploadAvatar = upload.fields([{ name: 'avatar', maxCount: 1 }]);

// Resizes and names the avatar
exports.resizeAvatar = asyncHandler(async (req, res, next) => {
  if (!req.files.avatar) return next();

  await mkdirp('client/public/img/avatars');

  req.files.filename = `avatar-${req.params.username}-${Date.now()}.jpeg`;
  const filePath = imagePath + req.files.filename;
  const smallFilePath = imagePath + 'small-' + req.files.filename;

  await sharp(req.files.avatar[0].buffer)
    .resize(200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(filePath, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
    });

  await sharp(req.files.avatar[0].buffer)
    .resize(50)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(smallFilePath, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
    });

  next();
});

// Saves avatar to user profile
exports.saveAvatar = asyncHandler(async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ username: req.params.username });

    if (!profile) {
      return res.status(400).json({ msg: 'No profile found' });
    }

    if (fs.existsSync(imagePath + profile.avatar)) {
      const filePath = imagePath + profile.avatar;
      console.log(`Deleting ${filePath}`.blue);
      fs.unlinkSync(imagePath + profile.avatar);
      console.log('finished deleting'.blue);
    }

    if (fs.existsSync(imagePath + profile.smallAvatar)) {
      const filePath = imagePath + profile.smallAvatar;
      console.log(`Deleting ${filePath}`.blue);
      fs.unlinkSync(imagePath + profile.smallAvatar);
      console.log('finished deleting'.blue);
    }

    await Profile.updateOne(
      { username: req.params.username },
      { avatar: req.files.filename }
    );

    await Twit.updateMany(
      { profile: profile._id },
      { twitAvatar: `small-${req.files.filename}` }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
});
