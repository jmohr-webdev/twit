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
// Route: PUT /api/v1/:username/avatar
// Uploads a avatar
// requires authentication

// Uploads the avatar
exports.uploadAvatar = upload.single('avatar');

// Resizes and names the avatar
exports.resizeAvatar = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  await mkdirp('client/public/img/avatars');

  req.file.filename = `avatar-${req.params.username}-${Date.now()}.jpeg`;

  const filePath = imagePath + req.file.filename;
  const smallFilePath = imagePath + 'small-' + req.file.filename;

  await sharp(req.file.buffer)
    .resize(200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(filePath, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
    });

  await sharp(req.file.buffer)
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
    }

    if (fs.existsSync(imagePath + profile.smallAvatar)) {
      const filePath = imagePath + profile.smallAvatar;
      console.log(`Deleting ${filePath}`.blue);
      fs.unlinkSync(imagePath + profile.smallAvatar);
    }

    await Profile.updateOne(
      { username: req.params.username },
      { avatar: req.file.filename, smallAvatar: `small-${req.file.filename}` }
    );

    await Twit.updateMany(
      { profile: profile._id },
      { twitAvatar: `small-${req.file.filename}` }
    );

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
});
