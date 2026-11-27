# File upload and messages

## 1. How files reach Express

A normal JSON request uses `application/json`. A file is sent as `multipart/form-data`; each field has a name. This project expects the image field to be named **profilePicture**. In Postman choose Body -> form-data, add a key named `profilePicture`, change its type from Text to File, then choose the image. Do not manually set the multipart Content-Type header in Postman; it adds the boundary.

## 2. Multer in this project

- `multer({ storage, fileFilter, limits })` creates the upload middleware.
- `diskStorage({ destination, filename })` chooses the folder and saved filename.
- `fileFilter(req, file, callback)` accepts or rejects a file.
- `limits.fileSize` caps size; `limits.files` caps number of files.
- `.single('profilePicture')` accepts one file and puts its information in `req.file`.
- `.array('photos', 5)` accepts up to five files under one field and puts them in `req.files`.
- `.fields([{ name: 'avatar', maxCount: 1 }])` accepts several named file fields.
- `.none()` accepts no files; `.any()` accepts any file fields (avoid it unless necessary).

Current profile upload: `PATCH /api/user/profile-picture` with Bearer token and one `profilePicture` file. Maximum 2 MB; accepted extensions/MIME types are JPG, PNG, WEBP. MIME and extension checks are useful first checks, but for a public production service also inspect file signatures and re-encode images (for example with an image-processing library) because client-provided MIME data can be spoofed.

## 3. Where to store files

- Local disk: easiest for learning/development; this project stores files in `uploads/profile-pictures` and saves only the relative URL in MongoDB. Back up the folder. Some cloud hosts use temporary/ephemeral disks, so local disk is not a reliable production storage choice there.
- Object storage (AWS S3, Cloudinary, etc.): recommended for production. Store the provider's URL/key in MongoDB; the binary stays in object storage.
- MongoDB binary/GridFS: possible, but usually unnecessary for ordinary profile images.

Never store image bytes as a huge base64 string in a normal user document.

## 4. Message endpoints

- `POST /api/message/public/:receiverId` — public route, no token. Body: `{ "content": "Hello" }`. Sender is saved as `null` (anonymous).
- `POST /api/message/:receiverId` — protected route, Bearer token required. Sender is taken from the token, not from the body.
- `GET /api/message/my` — protected route. Returns messages where `receiver` is the logged-in user. The client cannot choose another user's inbox.

## 5. Request flow

Public message: route -> controller -> service -> find receiver -> repository creates message -> response.

Protected message: route -> auth middleware verifies JWT and sets `req.user.userId` -> controller -> service -> repository.

Get own messages: auth middleware -> controller -> service -> repository filters by the authenticated receiver ID.

## 6. Important security note

The uploaded ZIP contained a `.env` file with credentials. It is intentionally not included in the updated ZIP. If those credentials are real, rotate the Upstash token, email app password, and JWT secret before using the project. Put your own values in `.env` using `.env.example` as a guide.
