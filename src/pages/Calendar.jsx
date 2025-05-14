import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ICAL from 'ical.js';
import { DateTime } from "luxon";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchICS() {
      try {
        //Below is the CorsProxy used for testing
        //const corsProxy = 'https://api.allorigins.win/raw?url=';
        const icsUrl = 'https://www.gig-o-matic.com/band/calfeed/1b7e6b99-d08f-457a-9c84-8319714861d4';
        const res = await fetch(icsUrl);
        //Below is part of the CorsProxy test
        //const res = await fetch(`${corsProxy}${encodeURIComponent(icsUrl)}`);
        const text = await res.text();


        const jcalData = ICAL.parse(text);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');

        const parsedEvents = vevents.map((vevent) => {
          const event = new ICAL.Event(vevent);
          return {
            summary: event.summary.replace('(Confirmed) - Sindikat Sina Roza', '').trim(),
            start: event.startDate.toJSDate(),
            end: event.endDate.toJSDate(),
            location: event.location,
            description: event.description,
          };

        }).sort((a, b) => a.start - b.start);

        setEvents(
          parsedEvents
          .filter(event => event.start > Date.now())
          .sort((a, b) => a.start - b.start)
          );
      } catch (err) {
        setError('Failed to load calendar events.');
        console.error(err);
      }
    }

    fetchICS();
  }, []);

  return (
    <motion.div
      className="p-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold text-white mb-6">Upcoming Gigs</h1>

      {error && <p className="text-red-400">{error}</p>}

      {events.length === 0 && !error ? (
        <p className="text-zinc-400">Loading events...</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event, index) => {
            const dt = DateTime.fromJSDate(event.start);

            return (
            <li key={index} className="bg-zinc-800 p-4 rounded shadow flex">
              
              <div className="w-16 shrink-0 bg-zinc-700 text-center rounded-l flex flex-col justify-center items-center p-2">
                <div className="text-sm font-semibold text-zinc-300">{dt.toFormat('ccc')}</div>  {/* Sat */}
                <div className="text-lg font-bold text-white">{dt.toFormat('LLL')}</div>          {/* Jun */}
                <div className="text-2xl font-bold text-white">{dt.toFormat('d')}</div>            {/* 22 */}
              </div>

             <div className="flex-1 p-4">
              <h2 className="text-xl font-semibold">{event.summary}</h2>
              <p className="text-zinc-400 text-sm">
                {DateTime.fromJSDate(event.start).toFormat("h:mm a").toLowerCase()} – {DateTime.fromJSDate(event.end).toFormat("h:mm a").toLowerCase()}
              </p>
              {event.location && (
                <address className="text-zinc-400 not-italic">
                  {/\d+/.test(event.location) ? (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {event.location}
                    </a>
                  ) : (
                    event.location
                  )}
                </address>
              )}
              </div>
             
            </li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
}

