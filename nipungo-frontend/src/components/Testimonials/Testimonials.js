import React, { useState } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Thompson',
    country: 'United Kingdom',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    package: 'Complete Sri Lanka Grand Tour',
    rating: 5,
    review:
      'NIPUNGO made our 14-day Sri Lanka trip absolutely seamless. From the moment we landed to the last day, every detail was perfectly organized. The guides were knowledgeable, accommodations were stunning, and the experiences were beyond our expectations. Sigiriya at dawn was truly magical!',
    date: 'March 2024',
  },
  {
    id: 2,
    name: 'David & Emma Chen',
    country: 'Australia',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    package: 'Sri Lanka Honeymoon Paradise',
    rating: 5,
    review:
      'We chose NIPUNGO for our honeymoon and it exceeded every expectation. The private beach dinners, couples spa treatments, and luxury resorts created the most romantic atmosphere. The team was incredibly attentive and arranged special surprises throughout our trip. We\'ll cherish these memories forever.',
    date: 'February 2024',
  },
  {
    id: 3,
    name: 'Marco Rossetti',
    country: 'Italy',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    package: 'Wildlife Safari Adventure',
    rating: 5,
    review:
      'The Yala leopard safari was the highlight of my trip to Asia. Our naturalist guide spotted three leopards in one morning — absolutely incredible. NIPUNGO\'s attention to detail and eco-lodge accommodations were first class. I\'ve already booked my return trip for the elephant season!',
    date: 'January 2024',
  },
  {
    id: 4,
    name: 'Priya Nair',
    country: 'India',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    package: 'Hill Country Tea Trail',
    rating: 5,
    review:
      'The scenic train from Kandy to Ella was unlike anything I\'ve experienced. NIPUNGO arranged first-class seats and a packed lunch — we spent the entire journey photographing the most beautiful landscapes. The tea estate tour and Nine Arch Bridge were magical highlights.',
    date: 'April 2024',
  },
  {
    id: 5,
    name: 'James & Lisa Kowalski',
    country: 'United States',
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    package: 'Family Fun Sri Lanka',
    rating: 5,
    review:
      'Traveling with three kids (ages 7, 10, 14) can be challenging, but NIPUNGO made it a breeze. Our kids LOVED feeding baby elephants at Pinnawala and the Yala safari was pure magic. The family guide was patient, fun, and knew exactly how to keep the children engaged. 10/10 would recommend!',
    date: 'December 2023',
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        className={`text-sm ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((p) => (p + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section className="section-padding bg-primary overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-4">
            <FiMessageSquare className="text-accent text-sm" />
            <span className="text-white/80 text-sm font-inter">Traveler Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-3">
            What Our Guests Say
          </h2>
          <p className="text-gray-400 font-inter max-w-xl mx-auto">
            Real experiences from real travelers who explored Sri Lanka with NIPUNGO.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 relative">
            {/* Quote mark */}
            <div className="absolute top-8 right-8 text-8xl font-serif text-white/5 leading-none select-none">
              "
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="shrink-0">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-accent/30"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <StarRating count={t.rating} />
                <p className="text-gray-300 font-inter text-lg leading-relaxed mt-4 mb-6 italic">
                  "{t.review}"
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold font-poppins">{t.name}</p>
                    <p className="text-gray-400 text-sm font-inter">{t.country} · {t.date}</p>
                  </div>
                  <div className="badge bg-accent/20 text-accent text-xs">
                    {t.package}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl border border-white/10 hover:border-accent/50 hover:bg-accent/10 text-white/60 hover:text-accent flex items-center justify-center transition-all duration-200"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl border border-white/10 hover:border-accent/50 hover:bg-accent/10 text-white/60 hover:text-accent flex items-center justify-center transition-all duration-200"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Mini Avatars Row */}
        <div className="flex justify-center gap-4 mt-12">
          {testimonials.map((t, i) => (
            <button key={t.id} onClick={() => setActive(i)} className="group">
              <img
                src={t.avatar}
                alt={t.name}
                className={`w-10 h-10 rounded-full object-cover transition-all duration-300 ring-2 ${
                  i === active ? 'ring-accent scale-110' : 'ring-transparent opacity-50 group-hover:opacity-80'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
