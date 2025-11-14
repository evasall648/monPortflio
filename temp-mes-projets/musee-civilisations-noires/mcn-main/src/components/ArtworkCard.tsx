import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { QRCodeDisplay } from "./QRCodeDisplay";
import { useState } from "react";

interface ArtworkCardProps {
  id: string;
  title: string;
  period: string;
  culture: string;
  image: string;
  hasAudio: boolean;
}

export const ArtworkCard = ({ id, title, period, culture, image, hasAudio }: ArtworkCardProps) => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const handleQRScan = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Afficher le QR code
    setShowQR(true);
    toast.success(`QR Code généré pour ${title}`);
  };

  return (
    <div className="relative">
      <Link to={`/artwork/${id}`}>
        <Card className="group card-enhanced hover:shadow-african transition-all duration-500 cursor-pointer h-full overflow-hidden hover-lift glass">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <p className="text-sm font-medium text-foreground line-clamp-2 text-shadow">
                  {title}
                </p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300 text-shadow">
              {title}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse-slow"></div>
                <span className="text-sm text-muted-foreground text-shadow">{period}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[hsl(var(--gold))] rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-sm text-accent font-semibold text-shadow">{culture}</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border/50">
              <div className="text-xs text-muted-foreground text-shadow">
                Cliquez pour voir les détails
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
      
      {/* Bouton QR séparé */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleQRScan}
          className="bg-accent/90 backdrop-blur-sm text-accent-foreground shadow-strong px-4 py-2 text-sm font-semibold rounded-lg hover:bg-accent transition-bounce hover-scale hover-glow flex items-center gap-2 glass"
        >
          <QrCode className="h-5 w-5" />
          Scanner QR
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">QR Code de l'œuvre</h3>
                <button
                  onClick={() => setShowQR(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  ×
                </button>
              </div>
              <QRCodeDisplay 
                artworkId={id}
                artworkTitle={title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
