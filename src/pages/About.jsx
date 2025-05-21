import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import { aboutText } from '../data/content';

export default function About() {

  const [otherBands, setOtherBands] = useState([]);

  useEffect(() => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0CRfpY27X3b4SwQsUp4kk1Kpk2MaCkaA07X7cZ8kBZuUKlfkCsva_DpNrI6QrXehKMLaBpVM-fCip/pub?gid=2095898904&single=true&output=csv';

    fetch(csvUrl)
      .then((response) => response.text())
      .then((csvText) => {
        const { data } = Papa.parse(csvText, { header: true });
        console.log("Parsed otherBands data:", data); // debugger
        setOtherBands(data.filter(band => band.Name?.trim())); // Basic validation doesn't filter out bands w/o images or links
      })
      .catch((error) => console.error('Error fetching other bands:', error));
  }, []);

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
        <h1 className="text-3xl font-bold text-primary mb-4">About the Band</h1>
        <p className="text-text max-w-2xl">{aboutText}
          
        </p>
      </section>

      {/* Members Section */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Members</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {members.map((member) => (
            <div key={member.name} className="bg-zinc-800 p-6 rounded-lg shadow text-center flex flex-col items-center">
              <img
                src={`/images/${member.name?.split(' ')[0]?.toLowerCase()}.jpg`}
                onError={(e) => {
                 e.target.onerror = null;
                 e.target.src = '/images/default-avatar.png';
                }}
                alt={member.name}
                className="w-32 h-32 min-w-0 rounded-full object-cover mb-4"
              />

              <h3 className="text-lg font-semibold text-secondary">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
              <p className="mt-2 text-text text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Bands Section */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Other Bands We Love</h2>
        <ul className="list-disc list-inside text-zinc-300 max-w-2xl mx-auto space-y-2">
          {otherBands
            .filter(band => band.Name?.trim())
            .map((band, index) => (
              <li key={index}>
                {band.Link?.trim() ? (
                  <a
                    href={band.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {band.Name.trim()}
                  </a>
                ) : (
                  band.Name.trim()
                )}
              </li>
            ))}
        </ul>

      </section>

      {/* Other Bands Section carousel */}
      {/*<section>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Other Bands We Love</h2>
        <div className="overflow-x-auto whitespace-nowrap space-x-4 px-2 pb-4">
          <div className="flex gap-6">
            {otherBands.map((band, index) => (
              <a
                key={index}
                href={band.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 rounded-lg p-4 shadow min-w-[250px] max-w-xs text-left hover:bg-zinc-700 transition-all"
              >
                <img
                  src={band['Image URL'] || '/images/default-band.jpg'}
                  alt={band.Name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold text-white">{band.Name}</h3>
                <p className="text-sm text-zinc-400">{band.Description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>*/}

    </motion.div>
  );
}

