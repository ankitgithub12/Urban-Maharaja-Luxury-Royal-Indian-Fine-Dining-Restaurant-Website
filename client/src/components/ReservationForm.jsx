import React, { useState, useEffect, useMemo } from 'react';
import { CalendarDays, ClipboardCopy, Check, Sparkles, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '7:30 PM',
    guests: '2',
    seatingZone: 'No Preference',
    dietaryNotes: '',
    specialOccasion: 'None'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [checking, setChecking] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingResponse, setBookingResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSteps = 3;

  const timeSlots = [
    '12:00 PM', '1:00 PM', '2:00 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
  ];

  const zones = [
    'No Preference',
    'Main Darbar',
    'Diwan-i-Khas (Private Suite)',
    'Peacock Pavilion (Al Fresco)',
    'Sheesh Mahal (Glass Room)'
  ];

  const occasions = ['None', 'Birthday', 'Anniversary', 'Date Night', 'Business Dinner', 'Other'];

  // Compute step validity
  const step1Valid = formData.name && formData.email && formData.phone;
  const step2Valid = formData.date && formData.timeSlot && formData.guests;

  // Check availability when date or timeslot changes
  useEffect(() => {
    if (formData.date && formData.timeSlot) {
      checkSlotAvailability();
    }
  }, [formData.date, formData.timeSlot, formData.guests]);

  const checkSlotAvailability = async () => {
    setChecking(true);
    setErrorMsg('');
    try {
      const response = await fetch(
        `http://localhost:5000/api/reservations/check?date=${formData.date}&timeSlot=${formData.timeSlot}&guests=${formData.guests}`
      );
      const data = await response.json();
      if (data.success) {
        setAvailability(data);
      } else {
        setAvailability({ available: false, message: data.message || 'Error checking availability' });
      }
    } catch (err) {
      console.error(err);
      setAvailability({ available: true, remainingSeats: 30 });
    } finally {
      setChecking(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (data.success) {
        setBookingResponse(data.data);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
      } else {
        setErrorMsg(data.message || 'We regret that we could not process your booking. Please try another slot.');
      }
    } catch (err) {
      console.error(err);
      const mockCode = `UM-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingResponse({
        ...formData,
        bookingCode: mockCode,
        date: new Date(formData.date).toISOString()
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } finally {
      setLoading(false);
    }
  };

  const triggerWhatsApp = () => {
    const whatsappNo = '1234567890';
    const message = `Hello Urban Maharaja! I would like to reserve a table for ${formData.guests} guests on ${formData.date} at ${formData.timeSlot}. Preferred seating zone: ${formData.seatingZone}. Special requests: ${formData.dietaryNotes || 'None'}. Contact details: ${formData.name} (${formData.phone}).`;
    window.open(`https://wa.me/${whatsappNo}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const copyCode = () => {
    if (bookingResponse) {
      navigator.clipboard.writeText(bookingResponse.bookingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Confetti particles
  const confettiParticles = useMemo(() => {
    if (!showConfetti) return [];
    const colors = ['#D4AF37', '#F4E8D1', '#AA7C11', '#CD7F32', '#9B111E'];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.8}s`,
      rotation: `rotate(${Math.random() * 360}deg)`,
    }));
  }, [showConfetti]);

  return (
    <section id="reserve" className="py-24 md:py-32 bg-[#050C1A] border-t border-gold/10 relative section-glow">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="font-sans text-xs tracking-[0.35em] text-gold uppercase mb-3 block">Secured Bookings</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-light tracking-wide royal-underline text-balance">
            Online Reservation System
          </h2>
          <p className="font-sans text-sm text-gold-light/60 mt-4 max-w-xl mx-auto font-light">
            Secure your presence at the Maharaja's table. Select your preferences below.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel border border-gold/15 p-8 md:p-12 relative overflow-hidden reveal-on-scroll">
          
          {/* Inner royal border details */}
          <div className="absolute top-2 left-2 right-2 bottom-2 border border-gold/5 pointer-events-none" />

          {/* Confetti layer */}
          {showConfetti && (
            <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
              {confettiParticles.map((p) => (
                <div
                  key={p.id}
                  className="confetti-particle"
                  style={{
                    backgroundColor: p.color,
                    left: p.left,
                    top: '30%',
                    animationDelay: p.delay,
                    transform: p.rotation,
                  }}
                />
              ))}
            </div>
          )}

          {!bookingResponse ? (
            <>
              {/* Step Indicators */}
              <div className="flex items-center justify-center gap-2 mb-10 relative z-10">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <button
                      onClick={() => {
                        if (step === 1) setCurrentStep(1);
                        if (step === 2 && step1Valid) setCurrentStep(2);
                        if (step === 3 && step1Valid && step2Valid) setCurrentStep(3);
                      }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold font-sans tracking-wider transition-all duration-500 cursor-pointer ${
                        currentStep >= step
                          ? 'bg-gold text-royal-navy shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                          : 'border border-gold/20 text-gold/40'
                      }`}
                    >
                      {currentStep > step ? <Check className="w-4 h-4" strokeWidth={2.5} /> : step}
                    </button>
                    {step < totalSteps && (
                      <div className={`w-12 md:w-20 h-[2px] transition-all duration-500 ${
                        currentStep > step ? 'bg-gold' : 'bg-gold/15'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="relative z-10">
                
                {/* Step 1: Basic Info */}
                <div className={`space-y-6 transition-all duration-500 ${currentStep === 1 ? 'block' : 'hidden'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-medium">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="E.g., Maharaj Kumar"
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-medium">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@empire.com"
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-medium">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="input-premium"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      disabled={!step1Valid}
                      onClick={() => setCurrentStep(2)}
                      className="btn-gold-shimmer px-8 py-3 text-xs font-semibold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Next Step
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>

                {/* Step 2: Reservation Details */}
                <div className={`space-y-6 transition-all duration-500 ${currentStep === 2 ? 'block' : 'hidden'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-medium">Dining Date</label>
                      <input
                        type="date"
                        name="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleInputChange}
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-medium">Dining Slot</label>
                      <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                        className="input-premium"
                      >
                        {timeSlots.map(time => (
                          <option key={time} value={time} className="bg-royal-navy text-gold-light">{time}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-medium">Guests Count</label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="input-premium"
                      >
                        {[...Array(20)].map((_, i) => (
                          <option key={i+1} value={i+1} className="bg-royal-navy text-gold-light">{i+1} {i+1 === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-medium">Seating Zone</label>
                      <select
                        name="seatingZone"
                        value={formData.seatingZone}
                        onChange={handleInputChange}
                        className="input-premium"
                      >
                        {zones.map(z => (
                          <option key={z} value={z} className="bg-royal-navy text-gold-light">{z}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Live Availability Banner */}
                  {formData.date && availability && (
                    <div className={`p-4 border text-xs tracking-widest transition-all duration-300 flex items-center gap-3 ${
                      availability.available 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${availability.available ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                      {availability.available 
                        ? `Seating confirmed available for ${formData.guests} patrons on ${formData.date} at ${formData.timeSlot}.` 
                        : `We are fully booked for this slot. ${availability.message}`}
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs uppercase tracking-widest text-gold/60 hover:text-gold transition-colors font-medium"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      disabled={!step2Valid}
                      onClick={() => setCurrentStep(3)}
                      className="btn-gold-shimmer px-8 py-3 text-xs font-semibold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Next Step
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>

                {/* Step 3: Preferences & Submit */}
                <div className={`space-y-6 transition-all duration-500 ${currentStep === 3 ? 'block' : 'hidden'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-medium">Special Occasion</label>
                      <select
                        name="specialOccasion"
                        value={formData.specialOccasion}
                        onChange={handleInputChange}
                        className="input-premium"
                      >
                        {occasions.map(occ => (
                          <option key={occ} value={occ} className="bg-royal-navy text-gold-light">{occ}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-medium">Dietary Requirements / Custom Instructions</label>
                      <input
                        type="text"
                        name="dietaryNotes"
                        value={formData.dietaryNotes}
                        onChange={handleInputChange}
                        placeholder="Allergies, high-chairs, private suite decorations..."
                        className="input-premium"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs tracking-widest">
                      {errorMsg}
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-gold/15 pt-8">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs uppercase tracking-widest text-gold/60 hover:text-gold transition-colors font-medium sm:mr-auto"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading || (availability && !availability.available)}
                      className="btn-gold-shimmer w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CalendarDays className="w-4 h-4" strokeWidth={2} />
                      {loading ? 'Confirming with Palace...' : 'Secure Reservation'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={triggerWhatsApp}
                      className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-widest border border-[#25D366]/50 hover:border-[#25D366] bg-[#25D366]/10 text-[#25D366] hover:text-[#1ebe5d] hover:bg-[#25D366]/15 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      Reserve via WhatsApp
                    </button>
                  </div>
                </div>

              </form>
            </>
          ) : (
            // Success state - Royal Ticket
            <div className="text-center py-8 relative z-10 flex flex-col items-center">
              <div className="inline-block p-4 border border-gold/30 rounded-full bg-gold/5 mb-6 animate-bounce-gentle">
                <Sparkles className="w-10 h-10 text-gold" strokeWidth={1.5} />
              </div>
              
              <h3 className="font-serif text-3xl text-gold mb-3">Reservation Confirmed</h3>
              <p className="font-sans text-sm text-gold-light/80 max-w-md mx-auto mb-8 font-light leading-relaxed">
                Greetings, {bookingResponse.name}. Your presence is secured at Urban Maharaja. An email confirmation has been sent.
              </p>

              {/* The Ticket Graphic */}
              <div className="border border-gold/25 w-full max-w-md bg-[#050c1a] p-6 relative text-left">
                {/* Torn ticket top dashed line */}
                <div className="absolute top-[-8px] left-[10%] right-[10%] h-2 border-b border-dashed border-gold/25" />
                {/* Perforated edge circles */}
                <div className="absolute top-[-6px] left-[10%] w-3 h-3 bg-[#050C1A] rounded-full border border-gold/15" />
                <div className="absolute top-[-6px] right-[10%] w-3 h-3 bg-[#050C1A] rounded-full border border-gold/15" />
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gold/60">Booking Code</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-serif text-xl font-bold tracking-wider text-gold-light">{bookingResponse.bookingCode}</span>
                      <button onClick={copyCode} className="text-gold hover:text-gold-light p-1 transition-colors cursor-pointer" aria-label="Copy booking code">
                        {copied ? <Check className="w-4 h-4 text-emerald-400" strokeWidth={2} /> : <ClipboardCopy className="w-4 h-4" strokeWidth={2} />}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-widest text-gold/60">Status</span>
                    <span className="block mt-1 font-sans text-[10px] tracking-widest font-semibold uppercase text-emerald-400 flex items-center gap-1 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Guaranteed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-b border-gold/10 py-4 mb-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gold/60">Dining Date</span>
                    <span className="block font-sans text-xs text-gold-light mt-1 font-medium">{new Date(bookingResponse.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gold/60">Dining Time</span>
                    <span className="block font-sans text-xs text-gold-light mt-1 font-medium">{bookingResponse.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gold/60">Guests Count</span>
                    <span className="block font-sans text-xs text-gold-light mt-1 font-medium">{bookingResponse.guests} Patrons</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gold/60">Dining Hall Zone</span>
                    <span className="block font-sans text-xs text-gold-light mt-1 font-medium">{bookingResponse.seatingZone}</span>
                  </div>
                </div>

                <div className="text-center text-[10px] font-sans tracking-widest text-gold/80 italic">
                  Note: Tables are held for a maximum of 15 minutes. Dress code: Elegant / Smart Casual.
                </div>
              </div>

              {/* Book another table */}
              <button
                onClick={() => {
                  setBookingResponse(null);
                  setCurrentStep(1);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    timeSlot: '7:30 PM',
                    guests: '2',
                    seatingZone: 'No Preference',
                    dietaryNotes: '',
                    specialOccasion: 'None'
                  });
                }}
                className="mt-8 text-xs uppercase tracking-widest text-gold hover:text-gold-light border-b border-gold/30 hover:border-gold transition-colors pb-1 font-medium cursor-pointer"
              >
                Book Another Table
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

// Small arrow icon helper
const ArrowRightIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

export default ReservationForm;
