import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface SkyImageUploadProps {
  onUpload: (file: File) => void;
  onClear: () => void;
}

export const SkyImageUpload: React.FC<SkyImageUploadProps> = ({ onUpload, onClear }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const clearImage = () => {
    setPreview(null);
    onClear();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Card className="w-full max-w-xl mx-auto overflow-hidden bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Analyse Visuelle du Ciel
        </h3>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative group cursor-pointer border-2 border-dashed rounded-xl transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center p-4
            ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-white/20 hover:border-white/40 hover:bg-white/5'}
            ${preview ? 'border-solid border-green-500/50' : ''}
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
          />

          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="upload-prompt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <div className="bg-white/10 p-4 rounded-full mb-4 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-8 h-8 text-white/70" />
                </div>
                <p className="text-white font-medium">Glissez-déposez une photo du ciel</p>
                <p className="text-white/50 text-sm mt-1">ou cliquez pour sélectionner un fichier</p>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full h-full flex flex-col items-center"
              >
                <img
                  src={preview}
                  alt="Aperçu du ciel"
                  className="w-full max-h-[300px] object-cover rounded-lg shadow-lg mb-4"
                />
                <div className="flex items-center gap-2 text-green-400 font-medium">
                  <CheckCircle2 className="w-5 h-5" />
                  Photo prête pour l'analyse
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearImage();
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};
