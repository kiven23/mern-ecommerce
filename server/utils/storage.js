// const AWS = require('aws-sdk');

// const keys = require('../config/keys');

// exports.s3Upload = async image => {
//   try {
//     let imageUrl = '';
//     let imageKey = '';

//     if (!keys.aws.accessKeyId) {
//       console.warn('Missing aws keys');
//     }

//     if (image) {
//       const s3bucket = new AWS.S3({
//         accessKeyId: keys.aws.accessKeyId,
//         secretAccessKey: keys.aws.secretAccessKey,
//         region: keys.aws.region
//       });

//       const params = {
//         Bucket: keys.aws.bucketName,
//         Key: image.originalname,
//         Body: image.buffer,
//         ContentType: image.mimetype
//       };

//       const s3Upload = await s3bucket.upload(params).promise();

//       imageUrl = s3Upload.Location;
//       imageKey = s3Upload.key;
//     }

//     return { imageUrl, imageKey };
//   } catch (error) {
//     return { imageUrl: '', imageKey: '' };
//   }
// };

//const AWS = require('aws-sdk');
//
//const keys = require('../config/keys');
//
//exports.s3Upload = async image => {
//  try {
//    let imageUrl = '';
//    let imageKey = '';
//
//    if (!keys.aws.accessKeyId) {
//      console.warn('Missing aws keys');
//    }
//
//    if (image) {
//      const s3bucket = new AWS.S3({
//        accessKeyId: keys.aws.accessKeyId,
//        secretAccessKey: keys.aws.secretAccessKey,
//        region: keys.aws.region
//      });
//
//      const params = {
//        Bucket: keys.aws.bucketName,
//        Key: image.originalname,
//        Body: image.buffer,
//        ContentType: image.mimetype
//      };
//
//      const s3Upload = await s3bucket.upload(params).promise();
//
//      imageUrl = s3Upload.Location;
//      imageKey = s3Upload.key;
//    }
//
//    return { imageUrl, imageKey };
//  } catch (error) {
//    return { imageUrl: '', imageKey: '' };
//  }
//};

const fs = require('fs');
const path = require('path');

exports.localUpload = async (image) => {
  try {
    let imageUrl = '';
    let imageKey = '';
     
    if (image) {
      const uploadsDir = '/config/public';
      
      // Auto-create uploads folder kung wala pa
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${image.originalname}`;
      const filePath = path.join(uploadsDir, fileName);

      // Save image buffer sa target folder
      fs.writeFileSync(filePath, image.buffer);

      // Sample public URL kung iseserve mo via frontend
      imageUrl = `/public/${fileName}`;
      imageKey = fileName;
    }
    console.log(imageUrl)
    return { imageUrl, imageKey };
  } catch (error) {
    console.error(error);
    return { imageUrl: '', imageKey: '' };
  }
};


