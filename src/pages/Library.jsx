import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import Fuse from 'fuse.js';

function FilterDropdown({ label, options, selected, onChange }) {
  return (
    <div className="mb-4">
      <details className="relative bg-zinc-700 p-3 rounded shadow">
        <summary className="cursor-pointer text-white font-medium">{label}</summary>
        <div className="absolute mt-2 left-0 w-48 bg-zinc-800/80 backdrop-blur-sm p-3 rounded shadow-lg z-50 space-y-1">
          {options.map((option) => (
            <label key={option} className="block text-sm text-white">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => {
                  onChange(
                    selected.includes(option)
                      ? selected.filter((item) => item !== option)
                      : [...selected, option]
                  );
                }}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </details>
    </div>
  );
}

export default function Library() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedNationalities, setSelectedNationalities] = useState([]);
  const [selectedMeters, setSelectedMeters] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [meters, setMeters] = useState([]);

  useEffect(() => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR7aGjIPB1v5Fxqstcs7dsPztv2CiYl0er2qZgDOTLPnPugmqpSKW65MkAqFNlgaz7KPVHXq207eeas/pub?gid=914662049&single=true&output=csv';

    fetch(csvUrl)
      .then((res) => res.text())
      .then((csvText) => {
        const { data } = Papa.parse(csvText, { header: true });
        setSongs(data);
        setNationalities([...new Set(data.map(d => d.Nationality).filter(Boolean))]);
        setMeters([...new Set(data.map(d => d.Meter).filter(Boolean))]);
      })
      .catch((err) => console.error('Failed to load songs:', err));
  }, []);

  const fuse = new Fuse(songs, {
    keys: ['Song', 'Dance rhythm'],
    threshold: 0.4,
  });

  const filtered = search ? fuse.search(search).map(({ item }) => item) : songs;

  const finalFiltered = filtered.filter((song) => {
    const nationalityMatch = selectedNationalities.length === 0 || selectedNationalities.includes(song.Nationality);
    const meterMatch = selectedMeters.length === 0 || selectedMeters.includes(song.Meter);
    return nationalityMatch && meterMatch;
  });

   const resultCount = finalFiltered.length;

  return (
    <div className="relative min-h-screen">
      <motion.div className="p-10 bg-background min-h-screen backdrop-blur-none">
        <h1 className="text-3xl font-bold text-primary mb-6">Song Library</h1>

        <input
          type="text"
          placeholder="Search by title or rhythm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md mb-6 p-2 rounded bg-secondary text-white border border-zinc-600"
        />
        
        {(search || selectedNationalities.length > 0 || selectedMeters.length > 0) && (
          <p className="text-white text-sm mb-4 font-semibold">
            {resultCount} result{resultCount !== 1 ? 's' : ''} found
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:gap-6">
          <FilterDropdown label="Filter by Nationality" options={nationalities} selected={selectedNationalities} onChange={setSelectedNationalities} />
          <FilterDropdown label="Filter by Meter" options={meters} selected={selectedMeters} onChange={setSelectedMeters} />
        </div>

        <div className="flex flex-wrap gap-2 mt-4 items-center relative">
          {selectedNationalities.map((n) => (
            <span key={`nat-${n}`} className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
              {n}
              <button onClick={() => setSelectedNationalities(selectedNationalities.filter(item => item !== n))} className="ml-2">✕</button>
            </span>
          ))}

          {selectedMeters.map((m) => (
            <span key={`meter-${m}`} className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
              {m}
              <button onClick={() => setSelectedMeters(selectedMeters.filter(item => item !== m))} className="ml-2">✕</button>
            </span>
          ))}

          {(selectedNationalities.length > 0 || selectedMeters.length > 0) && (
            <button onClick={() => { setSelectedNationalities([]); setSelectedMeters([]); }} className="ml-auto bg-red-600 text-white text-sm px-3 py-1 rounded-full">Clear All</button>
          )}
        </div>

        <ul className="mt-6 space-y-4 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin">
          {finalFiltered.map((song, idx) => (
            <li key={idx} className="bg-secondary p-4 rounded shadow text-white">
              <h2 className="text-xl font-semibold mb-1">{song.Song}</h2>
              <p className="text-sm text-zinc-400">
                <strong>Nationality:</strong> {song.Nationality} <br />
                <strong>Key:</strong> {song.Key} <br />
                <strong>Meter:</strong> {song.Meter} <br />
                <strong>Dance rhythm:</strong> {song['Dance rhythm']}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}


// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Papa from 'papaparse';

// function FilterDropdown({ label, options, selected, onChange }) {
//   return (
//     <div className="mb-4">
//       <details className="relative bg-zinc-700 p-3 rounded shadow">
//         <summary className="cursor-pointer text-white font-medium">{label}</summary>
//         <div className="absolute mt-2 left-0 w-48 bg-zinc-800 p-3 rounded shadow-lg z-50 space-y-1">
//           {options.map((option) => (
//             <label key={option} className="block text-sm text-white">
//               <input
//                 type="checkbox"
//                 checked={selected.includes(option)}
//                 onChange={() => {
//                   onChange(
//                     selected.includes(option)
//                       ? selected.filter((item) => item !== option)
//                       : [...selected, option]
//                   );
//                 }}
//                 className="mr-2"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       </details>
//     </div>
//   );
// }

// export default function Library() {
//   const [songs, setSongs] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selectedNationalities, setSelectedNationalities] = useState([]);
//   const [selectedMeters, setSelectedMeters] = useState([]);
//   const [nationalities, setNationalities] = useState([]);
//   const [meters, setMeters] = useState([]);

//   useEffect(() => {
//     const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR7aGjIPB1v5Fxqstcs7dsPztv2CiYl0er2qZgDOTLPnPugmqpSKW65MkAqFNlgaz7KPVHXq207eeas/pub?gid=914662049&single=true&output=csv';

//     fetch(csvUrl)
//       .then((res) => res.text())
//       .then((csvText) => {
//         const { data } = Papa.parse(csvText, { header: true });
//         setSongs(data);
//         setNationalities([...new Set(data.map(d => d.Nationality).filter(Boolean))]);
//         setMeters([...new Set(data.map(d => d.Meter).filter(Boolean))]);
//       })
//       .catch((err) => console.error('Failed to load songs:', err));
//   }, []);

//   const filtered = songs.filter((song) => {
//     const nationalityMatch =
//       selectedNationalities.length === 0 || selectedNationalities.includes(song.Nationality);

//     const meterMatch =
//       selectedMeters.length === 0 || selectedMeters.includes(song.Meter);

//     const textMatch =
//       song.Song?.toLowerCase().includes(search.toLowerCase()) ||
//       song['Dance Rhythm']?.toLowerCase().includes(search.toLowerCase());

//     return nationalityMatch && meterMatch && textMatch;
//   });

//   return (
//     <div className="relative min-h-screen">
//   <motion.div className="p-10 bg-black  min-h-screen backdrop-blur-none"
    
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       <h1 className="text-3xl font-bold text-white mb-6">Song Library</h1>

//       <input
//         type="text"
//         placeholder="Search by title..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full max-w-md mb-6 p-2 rounded bg-zinc-700 text-white border border-zinc-600"
//       />

//       <div className="relative z-10 flex flex-col sm:flex-row sm:gap-6">
//         <FilterDropdown
//           label="Filter by Nationality"
//           options={nationalities}
//           selected={selectedNationalities}
//           onChange={setSelectedNationalities}
//         />

//         <FilterDropdown
//           label="Filter by Meter"
//           options={meters}
//           selected={selectedMeters}
//           onChange={setSelectedMeters}
//         />
//       </div>
//             {/* Active Filter Badges + Clear All */}
//       <div className="flex flex-wrap gap-2 mt-4 items-center">
//         {selectedNationalities.map((n) => (
//           <span
//             key={`nat-${n}`}
//             className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center"
//           >
//             {n}
//             <button
//               onClick={() =>
//                 setSelectedNationalities(selectedNationalities.filter((item) => item !== n))
//               }
//               className="ml-2 text-xs hover:text-red-300"
//               aria-label={`Remove nationality filter: ${n}`}
//             >
//               ✕
//             </button>
//           </span>
//         ))}

//         {selectedMeters.map((m) => (
//           <span
//             key={`meter-${m}`}
//             className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full flex items-center"
//           >
//             {m}
//             <button
//               onClick={() =>
//                 setSelectedMeters(selectedMeters.filter((item) => item !== m))
//               }
//               className="ml-2 text-xs hover:text-red-300"
//               aria-label={`Remove meter filter: ${m}`}
//             >
//               ✕
//             </button>
//           </span>
//         ))}

//         {(selectedNationalities.length > 0 || selectedMeters.length > 0) && (
//           <button
//             onClick={() => {
//               setSelectedNationalities([]);
//               setSelectedMeters([]);
//             }}
//             className="ml-auto bg-zinc-700 hover:bg-zinc-600 text-white text-sm px-3 py-1 rounded-full"
//           >
//             Clear All Filters
//           </button>
//         )}
//       </div>


//       <ul className="mt-6 space-y-4 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin">
//         {filtered.map((song, idx) => (
//           <li key={idx} className="bg-zinc-800 p-4 rounded shadow text-white">
//             <h2 className="text-xl font-semibold mb-1">{song.Song}</h2>
//             <p className="text-sm text-zinc-400">
//               <strong>Nationality:</strong> {song.Nationality} <br />
//               <strong>Key:</strong> {song.Key} <br />
//               <strong>Meter:</strong> {song.Meter} <br />
//               <strong>Dance rhythm:</strong> {song['Dance rhythm']}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </motion.div>
// </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Papa from 'papaparse';

// export default function Library() {
//   const [songs, setSongs] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR7aGjIPB1v5Fxqstcs7dsPztv2CiYl0er2qZgDOTLPnPugmqpSKW65MkAqFNlgaz7KPVHXq207eeas/pub?gid=914662049&single=true&output=csv';

//     fetch(csvUrl)
//       .then((res) => res.text())
//       .then((csvText) => {
//         const { data } = Papa.parse(csvText, { header: true });
//         setSongs(data);
//       })
//       .catch((err) => console.error('Failed to load songs:', err));
//   }, []);

//   const filtered = songs.filter((song) =>
//     song.Song?.toLowerCase().includes(search.toLowerCase()) ||
//     song['Dance Rhythm']?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <motion.div
//       className="p-10"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       <h1 className="text-3xl font-bold text-white mb-6">Song Library</h1>

//       <input
//         type="text"
//         placeholder="Search by title..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full max-w-md mb-6 p-2 rounded bg-zinc-700 text-white border border-zinc-600"
//       />

//       <ul className="space-y-4">
//         {filtered.map((song, idx) => (
//           <li key={idx} className="bg-zinc-800 p-4 rounded shadow text-white">
//             <h2 className="text-xl font-semibold">{song.Song}</h2>
//             <p className="text-sm text-zinc-400">
//               <strong>Nationality:</strong> {song.Nationality} <br />
//               <strong>Key:</strong> {song.Key} <br />
//               <strong>Meter:</strong> {song.Meter} <br />
//               <strong>Dance rhythm:</strong> {song['Dance rhythm']}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </motion.div>
//   );
// }


// import { motion } from 'framer-motion';

// export default function Library() {
//   return (
//       <motion.div
//       className="p-10"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//         <h1 className="text-3xl font-bold text-white">Music Library</h1>
//         <p className="mt-2 text-zinc-300">Sheet music, recordings, and resources coming soon.</p>
//       </motion.div>
//   );
// }
