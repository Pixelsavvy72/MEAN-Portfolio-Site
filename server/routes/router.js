const express = require('express');
const ImageBE = require('../models/imageBE')
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


// /* GET api listing. */
// router.get('/', (req, res) => {
//   res.send('api works');
// });

router.get("", (req, res, next) => {
  ImageBE.find().then(documents => {
    res.status(200).json({
      message: "Images fetched successfully!",
      images: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  ImageBE.findById(req.params.id).then(image => {
    if (image) {
      console.log(image);
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.post("", checkAuth, (req, res, next) => {
  const image = new ImageBE({
    imageOrder: req.body.imageOrder,
    imageName: req.body.imageName,
    imageDesc: req.body.imageDesc,
    imageCat: req.body.imageCat,
    imageUrl: req.body.imageUrl,
    thumbnailUrl: req.body.thumbnailUrl
  });
  image.save().then(createdImage => {
    res.status(201).json({
      message: "Image added successfully",
      imageId: createdImage._id
    });
  });
});

router.put("/:id", checkAuth, (req, res, next) => {
  const image = new ImageBE({
    _id: req.body.id,
    imageOrder: req.body.imageOrder,
    imageName: req.body.imageName,
    imageDesc: req.body.imageDesc,
    imageCat: req.body.imageCat,
    imageUrl: req.body.imageUrl,
    thumbnailUrl: req.body.thumbnailUrl
  });
  ImageBE.updateOne({ _id: req.params.id }, image).then(result => {
    res.status(200).json({ message: "Update successful!"});
  })
})

router.delete("/:id", checkAuth, (req, res, next) => {
  ImageBE.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Image deleted!" });
  });
});

// OLD: Catch all other routes and return the index file
// app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'dist/index.html'));
  // });

module.exports = router;
