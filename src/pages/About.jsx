import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import { aboutText } from '../data/content';

export default function About() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0CRfpY27X3b4SwQsUp4kk1Kpk2MaCkaA07X7cZ8kBZuUKlfkCsva_DpNrI6QrXehKMLaBpVM-fCip/pub?gid=1147604637&single=true&output=csv';

    fetch(csvUrl)
      .then((res) => res.text())
      .then((csvText) => {
        const { data } = Papa.parse(csvText, { header: true });
        setMembers(data);
      })
      .catch((err) => console.error('Failed to load members:', err));
  }, []);

  return (
    <motion.div
      className="p-10 space-y-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* About the Band */}
      <section>
        <h1 className="text-3xl font-bold text-white mb-4">About the Band</h1>
        <p className="text-zinc-300 max-w-2xl">{aboutText}
          
        </p>
      </section>

      {/* Members Section */}
      {/*<section>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Members</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {members.map((member) => (
            <div key={member.name} className="bg-zinc-800 p-6 rounded-lg shadow text-center flex flex-col items-center">
              <img
                src={"/images/default-avatar.png"}
                alt={member.name}
                className="w-32 h-32 min-w-0 rounded-full object-cover mb-4"
              />

              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-blue-400">{member.role}</p>
              <p className="mt-2 text-zinc-400 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>*/}
      {/* Press Kit */}
      {/*<section>
        <h2 className="text-2xl font-bold text-white mb-4">Press Kit</h2>
        <p className="text-zinc-300 mb-2">
          Download our press materials, including high-res photos, logo, and band bio.
        </p>
        <a
          href="/public/downloads/SindikatSinaRoza_PressKit.zip"
          download
          className="inline-block mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Download Press Kit
        </a>
      </section>*/}
    </motion.div>
  );
}


// UPDATED CARDS
// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import Papa from 'papaparse';

// const bandMembers = [
//   {
//     name: 'Ayla Demir',
//     role: 'Clarinet',
//     image: '/images/ayla.jpg',
//     bio: 'Ayla weaves Balkan melodies with dazzling improvisation and deep tradition.',
//   },
//   {
//     name: 'Mateo Ruiz',
//     role: 'Tapan',
//     image: '/images/mateo.jpg',
//     bio: 'Mateo drives the heartbeat of the band with thunderous, joyful grooves.',
//   },
//   {
//     name: 'Lina Park',
//     role: 'Trumpet',
//     image: '/images/lina.jpg',
//     bio: 'Lina soars above the band with crisp tone and brilliant solos.',
//   },
//   // Add more members here
// ];

// export default function About() {
//   return (
//     <motion.div
//       className="p-10 space-y-16"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* About the Band */}
//       <section>
//         <h1 className="text-3xl font-bold text-white mb-4">About the Band</h1>
//         <p className="text-zinc-300 max-w-2xl">
//           Sindikat Sina Roza is a high-energy brass band that blends traditional music from the Balkans and Turkey with modern street band flair. Based in Seattle, we bring rhythm, joy, and irresistible grooves to parades, weddings, and dance floors alike.
//         </p>
//       </section>

//       {/* Members Section */}
//       <section>
//         <h2 className="text-2xl font-bold text-white mb-6 text-center">Members</h2>
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
//           {bandMembers.map((member) => (
//             <div key={member.name} className="bg-zinc-800 p-6 rounded-lg shadow text-center flex flex-col items-center">
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-32 h-32 rounded-full object-cover mb-4"
//               />
//               <h3 className="text-lg font-semibold text-white">{member.name}</h3>
//               <p className="text-sm text-blue-400">{member.role}</p>
//               <p className="mt-2 text-zinc-400 text-sm">{member.bio}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {
//         //MEMBERS IN LEFT-ALIGNED, CARDS LESS ROUNDED
//       /*<section>
//         <h2 className="text-2xl font-bold text-white mb-6">Members</h2>
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
//           {bandMembers.map((member) => (
//             <div key={member.name} className="bg-zinc-800 p-4 rounded shadow text-center">
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
//               />
//               <h3 className="text-lg font-semibold text-white">{member.name}</h3>
//               <p className="text-sm text-blue-400">{member.role}</p>
//               <p className="mt-2 text-zinc-400 text-sm">{member.bio}</p>
//             </div>
//           ))}
//         </div>
//       </section>*/}

//       {/* Press Kit */}
//       <section>
//         <h2 className="text-2xl font-bold text-white mb-4">Press Kit</h2>
//         <p className="text-zinc-300 mb-2">
//           Download our press materials, including high-res photos, logo, and band bio.
//         </p>
//         <a
//           href="/public/downloads/SindikatSinaRoza_PressKit.zip"
//           download
//           className="inline-block mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//         >
//           Download Press Kit
//         </a>
//       </section>
//     </motion.div>
//   );
// }


//ORIGINAL
//import { motion } from 'framer-motion';

// export default function About() {
//   return (
//       <motion.div
//       className="p-10"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//         <h1 className="text-3xl font-bold text-white">About the Band</h1>
//         <p className="mt-2 text-zinc-300">We bring joy, rhythm, and brass from Istanbul to Seattle.</p>
//       </motion.div>
//      );
// }
