import React, { useState } from 'react';
import { Send, Bell, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const SubscriptionSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Inscription réussie !');
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 mb-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40 backdrop-blur-xl border border-white/20" />
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-3">Restez au courant</h2>
            <p className="text-white/70 max-w-md">
              Abonnez-vous à notre newsletter pour recevoir des alertes météo précises et des analyses personnalisées basées sur vos photos.
            </p>
          </div>

          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 focus:bg-white/20 transition-all rounded-xl pl-4"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="h-12 px-8 bg-white text-blue-600 hover:bg-white/90 font-bold rounded-xl transition-all shadow-lg hover:shadow-white/20"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
                      />
                    ) : (
                      <span className="flex items-center gap-2">
                        S'abonner <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/20 backdrop-blur-md border border-green-500/30 p-4 rounded-2xl flex items-center gap-4"
                >
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Merci pour votre inscription !</p>
                    <p className="text-white/60 text-sm">Vous recevrez bientôt nos premières prévisions.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center gap-2 mt-4 text-white/40 text-xs justify-center md:justify-start">
              <Bell className="w-3 h-3" />
              <span>Pas de spam, seulement de la météo. Désinscription possible à tout moment.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
