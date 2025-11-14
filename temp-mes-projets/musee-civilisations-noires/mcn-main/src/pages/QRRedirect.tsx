import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mcnArtworks } from '@/data/mcn/artworks';

export const QRRedirect = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'œuvre existe
    const artwork = mcnArtworks.find((a) => a.id === id);
    
    if (artwork) {
      // Rediriger vers la page de détail de l'œuvre
      navigate(`/artwork/${id}`, { replace: true });
    } else {
      // Si l'œuvre n'existe pas, rediriger vers la galerie
      navigate('/gallery', { replace: true });
    }
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirection en cours...</p>
      </div>
    </div>
  );
};
