import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Camera, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import jsQR from "jsqr";

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
  language: string;
}

export const QRScanner = ({ onScan, onClose, language }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const translations = {
    fr: {
      title: "Scanner QR Code",
      subtitle: "Pointez votre caméra vers le code QR",
      start: "Démarrer le scan",
      stop: "Arrêter le scan",
      close: "Fermer",
      error: "Erreur d'accès à la caméra",
      notFound: "Code QR non trouvé",
      success: "Code QR scanné avec succès !"
    },
    en: {
      title: "Scan QR Code",
      subtitle: "Point your camera at the QR code",
      start: "Start scanning",
      stop: "Stop scanning",
      close: "Close",
      error: "Camera access error",
      notFound: "QR code not found",
      success: "QR code scanned successfully!"
    },
    wo: {
      title: "Scanner QR Code",
      subtitle: "Pointez caméra bi ci code QR",
      start: "Jëkk scan",
      stop: "Dégg scan",
      close: "Ubb",
      error: "Erreur d'accès à la caméra",
      notFound: "Code QR gis-gis",
      success: "Code QR scanner ak succès!"
    }
  };

  const t = translations[language as keyof typeof translations];

  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);

      // Vérifier si getUserMedia est supporté
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Démarrer la détection QR
      startQRDetection();
    } catch (err) {
      console.error('Erreur d\'accès à la caméra:', err);
      let errorMessage = t.error;
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          errorMessage = language === 'fr' ? 'Permission caméra refusée' :
                        language === 'en' ? 'Camera permission denied' :
                        'Permission caméra refusée';
        } else if (err.name === 'NotFoundError') {
          errorMessage = language === 'fr' ? 'Aucune caméra trouvée' :
                        language === 'en' ? 'No camera found' :
                        'Caméra bu gis';
        } else if (err.name === 'NotSupportedError') {
          errorMessage = language === 'fr' ? 'Caméra non supportée sur cet appareil' :
                        language === 'en' ? 'Camera not supported on this device' :
                        'Caméra gis-gis ci appareil bi';
        }
      }
      
      setError(errorMessage);
      setIsScanning(false);
      toast.error(errorMessage);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startQRDetection = () => {
    const detectQR = () => {
      if (!isScanning || !videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Simulation de détection QR (en réalité, on utiliserait une vraie librairie)
      // Pour le hackathon, on simule une détection basique
      const qrCode = detectQRCode(imageData);
      
      if (qrCode) {
        toast.success(t.success);
        onScan(qrCode);
        stopScanning();
      } else {
        requestAnimationFrame(detectQR);
      }
    };

    requestAnimationFrame(detectQR);
  };

  // Détection QR améliorée avec jsQR + simulation
  const detectQRCode = (imageData: ImageData): string | null => {
    try {
      // Utiliser jsQR pour détecter les vrais codes QR
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        console.log('QR Code détecté:', code.data);
        return code.data;
      }
      
      // Simulation de détection pour le test
      // Si pas de vraie détection, on simule après 3 secondes
      return null;
    } catch (error) {
      console.error('Erreur détection QR:', error);
      return null;
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{t.title}</h2>
              <p className="text-muted-foreground">{t.subtitle}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="relative">
            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover"
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                className="hidden"
              />
              
              {!isScanning && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center text-white">
                    <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Caméra prête</p>
                  </div>
                </div>
              )}

              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-accent rounded-lg animate-pulse">
                    <div className="w-full h-full border-2 border-white/30 rounded-lg"></div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 mb-4">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-3">
              {!isScanning ? (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={startScanning}
                  className="flex-1"
                >
                  <QrCode className="h-5 w-5 mr-2" />
                  {t.start}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={stopScanning}
                  className="flex-1"
                >
                  <X className="h-5 w-5 mr-2" />
                  {t.stop}
                </Button>
              )}
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
