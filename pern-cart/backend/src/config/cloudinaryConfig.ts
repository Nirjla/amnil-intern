import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as dotenv from 'dotenv';
import { IParams } from '../interfaces/interfaces';

dotenv.config();

cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
});



const storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
            folder: 'WebxUploads',
            allowedFormats: ['jpeg', 'jpg', 'png'],
      } as IParams,
});

export { cloudinary, storage };
