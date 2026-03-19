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
        const icsUrl = 'https://www.gig-o-matic.com/band/calfeed/1b7e6b99-d08f-457a-9c84-8319714861d4';
        const res = await fetch(icsUrl);
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
      <h1 className="text-4xl font-header text-accent mb-6">Upcoming Shows</h1>

      {error && <p className="text-red-400">{error}</p>}

      {events.length === 0 && !error ? (
        <p className="text-zinc-400">Loading events...</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event, index) => {
            const dt = DateTime.fromJSDate(event.start);

            return (
            <li key={index} className="relative bg-[rgba(22,44,71,0.9)] backdrop-blur-md p-4 rounded-xl flex
              border border-white/15
              shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.3)]">

              <div className="absolute left-4 right-4 top-[1px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <div className="w-16 shrink-0 bg-[rgba(0,60,110,0.9)] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.2)] text-center rounded flex flex-col justify-center items-center p-2">
                <div className="text-sm font-header text-pop">{dt.toFormat('ccc')}</div>  {/* Sat */}
                <div className="text-2xl tracking-wide font-header text-accent">{dt.toFormat('LLL')}</div>          {/* Jun */}
                <div className="text-2xl font-header text-accent">{dt.toFormat('d')}</div>            {/* 22 */}
              </div>

             <div className="flex-1 p-4">
              <h2 className="text-2xl text-primary font-header">{event.summary}</h2>
              <p className="text-primary font-body text-sm">
                {DateTime.fromJSDate(event.start).toFormat("h:mm a").toLowerCase()} – {DateTime.fromJSDate(event.end).toFormat("h:mm a").toLowerCase()}
              </p>
              {event.location && (
                <address className="text-secondary font-body">
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

