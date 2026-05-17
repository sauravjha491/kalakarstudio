// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';

// const crew = [
//   { name: "Vishal Punjabi", role: "Founder", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" },
//   { name: "Hojo", role: "Senior Cinematographer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" },
//   { name: "Kate", role: "Creative Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80" },
//   { name: "Aashima", role: "Editor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" }
// ];

// export default function CrewPage() {
//   return (
//     <div className="p-8">
//       <div className="text-center py-16">
//         <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight uppercase">MEET OUR CREW</h1>
//         <p className="text-gray-500 text-lg max-w-2xl mx-auto">
//           If our crew in a studio group shot looks this good, imagine what your wedding film will look like.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
//         {crew.map((member, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ y: -10 }}
//             className="group text-center"
//           >
//             <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl">
//               <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
//             </div>
//             <h3 className="text-2xl font-serif tracking-tight">{member.name}</h3>
//             <p className="text-accent text-sm font-bold uppercase tracking-widest mt-2">{member.role}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CrewMember {
  id: number;
  name: string;
  role: string;
  img: string;
}

export default function CrewPage() {
  const [crew, setCrew] = useState<CrewMember[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/crew')
      .then((res) => res.json())
      .then((data) => setCrew(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <div className="text-center py-16">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight uppercase">
          MEET OUR CREW
        </h1>

        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          If our crew in a studio group shot looks this good, imagine what your wedding film will look like.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {crew.map((member, i) => (
          <motion.div
            key={member.id}
            whileHover={{ y: -10 }}
            className="group text-center"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-2xl font-serif tracking-tight">
              {member.name}
            </h3>

            <p className="text-accent text-sm font-bold uppercase tracking-widest mt-2">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}