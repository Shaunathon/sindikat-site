//CARD IMPLEMENTATION W/ EMAIL
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.div
      className="p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold text-primary mb-4">Contact Us</h1>
      <p className="text-text mb-8">
        Whether you're planning a festival, a wedding, or a wild Balkan-style street party — we’d love to hear from you!
      </p>

      <div className="bg-secondary p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-semibold text-white mb-2">Booking & Inquiries</h2>
        <p className="text-zinc-400 mb-1">Email us directly at:</p>
        <a
          href="mailto:contact@sinarozabrass.band"
          className="text-blue-400 underline break-words"
        >
          contact@sinarozabrass.band
        </a>
      </div>

      {/* Press Kit */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Press Kit</h2>
        <p className="text-zinc-300 mb-2">
          Download our press materials, including high-res photos, logo, and band bio.
        </p>
        <a
          href="/public/downloads/SindikatSinaRoza_PressKit.zip"
          download
          className="inline-block mt-2 bg-accent hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Download Press Kit
        </a>
      </section>
    </motion.div>
  );
}


// FORM WITH NEED TO CONNECT TO FORMSPREE
//import { useState } from 'react';
// import { motion } from 'framer-motion';

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   function handleChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Future: Send data to API or external service
//   }

//   return (
//     <motion.div
//       className="p-10"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
//       <p className="text-zinc-300 mb-8">
//         Have a question or want to book us for your event? Drop us a line!
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-6 max-w-md bg-zinc-800 p-6 rounded-lg shadow-md">
//         <div>
//           <label className="block text-zinc-300 mb-1" htmlFor="name">Name</label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring focus:ring-blue-500"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-zinc-300 mb-1" htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring focus:ring-blue-500"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-zinc-300 mb-1" htmlFor="message">Message</label>
//           <textarea
//             name="message"
//             id="message"
//             rows="4"
//             className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring focus:ring-blue-500"
//             value={formData.message}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//         >
//           Send Message
//         </button>
//       </form>
//     </motion.div>
//   );
// }


//ORIGINAL
// import { motion } from 'framer-motion';

// export default function Contact() {
//   return (
//     <motion.div
//       className="p-10"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
      
//         <h1 className="text-3xl font-bold text-white">Contact Us</h1>
//         <p className="mt-2 text-zinc-300">For booking or inquiries, email us at: <a href="mailto:band@example.com" className="underline text-blue-400">contact@sinarozabrass.band</a></p>
      
//     </motion.div>
//   );
// }
