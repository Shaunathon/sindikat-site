import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { bandBio } from '../data/content';

const galleryImages = [
  '/images/gallery/gallery1.jpg',
  '/images/gallery/gallery2.jpg',
  '/images/gallery/gallery3.jpg',
  '/images/gallery/gallery4.jpg',
  '/images/gallery/gallery5.jpg',
  '/images/gallery/gallery6.jpg',
  '/images/gallery/gallery7.jpg',
  '/images/gallery/gallery8.jpg',
  '/images/gallery/gallery9.jpg',
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <motion.div
      className="flex flex-col items-center p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src="../images/band-photo.jpg"
        alt="band photo"
        className="w-180 h-auto rounded-lg mb-6 shadow-lg"
      />

      <h1 className="self-start text-4xl font-header text-accent">Welcome!</h1>
      <p className="mt-2 text-secondary font-body">{bandBio}</p>

      {/* GALLERY SECTION */}
      <section className="mt-12 w-full">
        <h2 className="text-3xl font-header text-accent mb-6">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Gallery image ${i + 1}`}
              className="rounded-lg shadow-lg w-full h-auto object-cover cursor-pointer"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={galleryImages.map((src) => ({ src }))}
      />
    </motion.div>
  );
}


// import { motion } from 'framer-motion';
// import { bandBio } from '../data/content';

// export default function Home() {

//   return (
//     <motion.div
//       className="flex flex-col items-center p-10"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >

//       <img
//       src="../images/band-photo.jpg"
//       alt="band photo"
//       className="w-100 h-auto rounded-lg mb-6 shadow-lg"
//       />

//       <h1 className="self-start text-4xl font-header text-accent">Welcome!</h1>
//       <p className="mt-2 text-secondary font-body">{bandBio}</p>
//     </motion.div>
//   );
// }
