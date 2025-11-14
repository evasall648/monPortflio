import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  artworkId: string;
  artworkTitle: string;
  className?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  artworkId,
  artworkTitle,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Générer l'URL de redirection vers la description de l'œuvre
      // Utiliser l'URL complète du site déployé
      const baseUrl = window.location.origin;
      const artworkUrl = `${baseUrl}/artwork/${artworkId}`;
      
      console.log('QR Code URL générée:', artworkUrl); // Debug
      
      // Générer le QR code
      QRCode.toCanvas(canvasRef.current, artworkUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1a1a1a',
          light: '#ffffff'
        }
      }, (error) => {
        if (error) console.error('Erreur génération QR code:', error);
      });
    }
  }, [artworkId]);

  return (
    <div className={`bg-white rounded-lg border border-amber-100 p-6 shadow-lg ${className}`}>
      {/* Titre */}
      <h3 className="text-orange-600 text-center text-lg font-semibold mb-4">
        QR Code de l'œuvre
      </h3>
      
      {/* QR Code */}
      <div className="flex justify-center mb-4">
        <canvas 
          ref={canvasRef}
          className="border border-gray-200 rounded-lg"
        />
      </div>
      
      {/* Identifiant de l'œuvre */}
      <div className="flex justify-center mb-3">
        <span className="bg-amber-50 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
          {artworkId}
        </span>
      </div>
      
      {/* Instruction */}
      <p className="text-gray-600 text-center text-sm">
        Scannez ce code pour partager cette œuvre
      </p>
      
      {/* Titre de l'œuvre */}
      <p className="text-gray-800 text-center text-sm font-medium mt-2">
        {artworkTitle}
      </p>
    </div>
  );
};
