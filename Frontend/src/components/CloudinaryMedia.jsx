const CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export default function CloudinaryMedia({
  publicId,
  type = "image",
  className = "",
}) {

  // ================= VIDEO URL =================

  const videoUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto,br_800k,w_720/${publicId}`;

  // ================= IMAGE URL =================

  const imageUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_1200/${publicId}`;

  // ================= VIDEO =================

  if (type === "video") {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`w-full h-full object-cover ${className}`}
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
      </video>
    );
  }

  // ================= IMAGE =================

  return (
    <img
      src={imageUrl}
      alt="Gallery Media"
      loading="lazy"
      className={`w-full h-full object-cover ${className}`}
    />
  );
}