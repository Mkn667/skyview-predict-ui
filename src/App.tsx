import { useState } from 'react';
import { SkyImageUpload } from './components/weather/SkyImageUpload';
import { LocationSearch } from './components/weather/LocationSearch';
import { WeatherDisplay } from './components/weather/WeatherDisplay';
import { SubscriptionSection } from './components/weather/SubscriptionSection';
import { Toaster } from './components/ui/sonner';
import { CloudSun, Info } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const generateMockWeather = (location: string) => {
    setIsLoading(true);
    setCurrentLocation(location);
    
    // Simulate processing delay
    setTimeout(() => {
      setWeatherData({
        location: location,
        temp: Math.floor(Math.random() * (28 - 15) + 15),
        condition: Math.random() > 0.5 ? 'Ensoleillé' : 'Partiellement Nuageux',
        humidity: 65,
        windSpeed: 12,
        description: Math.random() > 0.5 ? "Ciel dégagé avec quelques nuages d'altitude" : "Passages nuageux prévus en fin de journée",
        date: new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleImageUpload = (file: File) => {
    // If we have a location, use it, otherwise use a generic "Ma position"
    generateMockWeather(currentLocation || "Analyse locale (basée sur l'image)");
  };

  const handleLocationSelect = (city: string) => {
    generateMockWeather(city);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans selection:bg-white/30 selection:text-white">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/854e46d4-9d63-42d4-b1f1-b882b9f6fa4e/weather-bg-c2b711b1-1780996375951.webp')` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/40 via-blue-900/20 to-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-xl">
              <CloudSun className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Météo<span className="text-white/60">Vision</span>
            </h1>
          </div>
          <p className="text-white/70 text-lg max-w-lg mx-auto leading-relaxed">
            Prédictions météorologiques intelligentes basées sur vos photos du ciel et votre localisation.
          </p>
        </motion.header>

        {/* Search & Upload Section */}
        <div className="w-full flex flex-col gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <LocationSearch onLocationSelect={handleLocationSelect} />
          </motion.div>

          <div className="flex items-center justify-center gap-4 text-white/30 my-2">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-xs font-bold uppercase tracking-widest">OU</span>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-white/20" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SkyImageUpload onUpload={handleImageUpload} onClear={() => setWeatherData(null)} />
          </motion.div>
        </div>

        {/* Results Section */}
        <WeatherDisplay data={weatherData} loading={isLoading} />

        {/* Feature Highlights (Optional but adds polish) */}
        {!weatherData && !isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-16"
          >
            {[
              { title: "Analyse Visuelle", desc: "Notre IA analyse la formation des nuages pour prédire les changements à court terme." },
              { title: "Précision Locale", desc: "Données ultra-locales basées sur votre position géographique exacte." },
              { title: "Mises à jour", desc: "Recevez des notifications en cas de changement brusque de conditions." }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors cursor-default group">
                <Info className="w-5 h-5 text-white/40 mb-3 group-hover:text-white transition-colors" />
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Subscription */}
        <SubscriptionSection />

        {/* Footer */}
        <footer className="mt-20 text-white/30 text-sm flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">À propos</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p>© 2024 MétéoVision. Tous droits réservés.</p>
        </footer>
      </div>

      <Toaster position="top-right" closeButton richColors />
    </div>
  );
}

export default App;
