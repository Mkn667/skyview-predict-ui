import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface WeatherData {
  location: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
  date: string;
}

interface WeatherDisplayProps {
  data: WeatherData | null;
  loading: boolean;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12">
        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 h-[400px] flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
            />
            <Cloud className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <p className="text-white text-xl font-medium">Analyse météo en cours...</p>
            <p className="text-white/50">Nous consultons les données atmosphériques pour vous.</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const WeatherIcon = () => {
    const cond = data.condition.toLowerCase();
    if (cond.includes('soleil') || cond.includes('clair')) return <Sun className="w-16 h-16 text-yellow-400" />;
    if (cond.includes('pluie')) return <CloudRain className="w-16 h-16 text-blue-400" />;
    return <Cloud className="w-16 h-16 text-white" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Weather Card */}
        <Card className="md:col-span-2 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-white/20 p-8 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-white/80 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{data.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{data.date}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Prédiction Actuelle</span>
              </div>
            </div>

            <div className="flex items-center gap-8 my-8">
              <WeatherIcon />
              <div>
                <h2 className="text-6xl font-bold text-white mb-2">{data.temp}°C</h2>
                <p className="text-2xl text-white/90 font-medium capitalize">{data.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Wind className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">Vent</p>
                  <p className="text-white font-medium">{data.windSpeed} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Droplets className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">Humidité</p>
                  <p className="text-white font-medium">{data.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Thermometer className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">Ressenti</p>
                  <p className="text-white font-medium">{data.temp - 1}°C</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Small Tips/Recommendation Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Conseil du Jour</h3>
            <p className="text-white/70 text-sm leading-relaxed italic">
              "Basé sur l'analyse visuelle du ciel et les données locales, {data.description.toLowerCase().includes('soleil') ? 'profitez de cette belle journée pour une promenade !' : 'pensez à prendre un parapluie par précaution.'}"
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <p className="text-white/40 text-xs mb-1">Qualité de l'air</p>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Excellente</span>
                <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <p className="text-white/40 text-xs mb-1">Indice UV</p>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Faible (2)</span>
                <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
