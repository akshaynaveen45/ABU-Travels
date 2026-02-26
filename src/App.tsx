import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  ChevronRight, 
  Menu, 
  X, 
  Star, 
  Shield, 
  Zap,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

// Types
interface BookingData {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  carType: string;
}

const CAR_TYPES = [
  { id: 'economy', name: 'Economy', price: '₹12/km', icon: Car },
  { id: 'premium', name: 'Premium Sedan', price: '₹18/km', icon: Car },
  { id: 'suv', name: 'Luxury SUV', price: '₹25/km', icon: Car },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    carType: 'economy'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      if (data.success) {
        setBookingStatus({ success: true, message: `Booking Confirmed! ID: ${data.bookingId}` });
        // Reset form after success
        setTimeout(() => setBookingStatus(null), 5000);
      }
    } catch (error) {
      setBookingStatus({ success: false, message: 'Failed to book. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white px-6 py-4 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-sm flex items-center justify-center">
              <Car size={20} className="text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">ABU TRAVELS</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Ride</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Drive</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Business</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">About</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 hover:bg-white/10 rounded-full transition-colors text-sm">Log in</button>
            <button className="px-6 py-2 bg-white text-black rounded-full font-semibold text-sm hover:bg-[#D4AF37] transition-all">Sign up</button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black text-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-bold">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Ride</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>Drive</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>Business</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>About</a>
              <hr className="border-white/10" />
              <button className="w-full py-4 bg-white text-black rounded-xl">Sign up</button>
              <button className="w-full py-4 border border-white/20 rounded-xl">Log in</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Booking Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
              Book Your <span className="text-[#D4AF37]">ABU Taxi</span> in Minutes
            </h1>
            
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-100">
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter pickup location"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                    value={bookingData.pickup}
                    onChange={(e) => setBookingData({...bookingData, pickup: e.target.value})}
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin size={20} className="text-[#D4AF37]" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter destination"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                    value={bookingData.destination}
                    onChange={(e) => setBookingData({...bookingData, destination: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Calendar size={18} />
                    </div>
                    <input 
                      type="date" 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Clock size={18} />
                    </div>
                    <input 
                      type="time" 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                      value={bookingData.time}
                      onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {CAR_TYPES.map((car) => (
                    <button
                      key={car.id}
                      type="button"
                      onClick={() => setBookingData({...bookingData, carType: car.id})}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                        bookingData.carType === car.id 
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5' 
                        : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <car.icon size={24} className={bookingData.carType === car.id ? 'text-[#D4AF37]' : 'text-slate-400'} />
                      <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{car.name}</span>
                      <span className="text-[10px] text-slate-500">{car.price}</span>
                    </button>
                  ))}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Book Now'}
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {bookingStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center text-sm font-medium ${
                      bookingStatus.success ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {bookingStatus.message}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/taxi-abu/1200/1400" 
                alt="ABU Travels Premium Service" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                <div className="text-white">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />)}
                  </div>
                  <p className="text-xl font-medium italic">"The most reliable taxi service in Visakhapatnam. Premium cars and professional drivers always on time."</p>
                  <p className="mt-4 font-bold">— Rajesh Kumar, Frequent Traveler</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-xs font-bold">Verified Drivers</p>
                <p className="text-[10px] text-slate-500">100% Safety Guaranteed</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-xs font-bold">Fast Pickup</p>
                <p className="text-[10px] text-slate-500">Average 5 mins wait</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ABU Travels?</h2>
            <p className="text-slate-600">Experience the gold standard of transportation in the City of Destiny.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Fleet",
                desc: "From budget-friendly hatchbacks to luxury sedans, we have the perfect ride for every occasion.",
                icon: Car
              },
              {
                title: "Professional Drivers",
                desc: "Our drivers are background-checked, trained, and local experts of Vizag's routes.",
                icon: Shield
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden charges. What you see is what you pay. Fixed rates for airport transfers.",
                icon: Zap
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-black text-[#D4AF37] rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-sm flex items-center justify-center">
                  <Car size={20} className="text-black" />
                </div>
                <span className="text-xl font-bold tracking-tight">ABU TRAVELS</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Providing premium transportation services across Visakhapatnam since 2015. Your comfort and safety are our top priorities.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all"><Twitter size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all"><Instagram size={18} /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Fleet</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">City Rides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Airport Transfers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Outstation Trips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Travel</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-center gap-3"><Phone size={16} className="text-[#D4AF37]" /> +91 98765 43210</li>
                <li className="flex items-center gap-3"><Mail size={16} className="text-[#D4AF37]" /> support@abutravels.com</li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#D4AF37] mt-1" /> 
                  123 Beach Road, MVP Colony,<br />Visakhapatnam, AP 530017
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 ABU Travels. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
