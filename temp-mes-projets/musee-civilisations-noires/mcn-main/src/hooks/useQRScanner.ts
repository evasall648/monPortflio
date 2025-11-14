import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseQRScannerReturn {
  isScanning: boolean;
  startScanning: () => void;
  stopScanning: () => void;
  onQRCodeDetected: (code: string) => void;
}

export const useQRScanner = (onScan: (result: string) => void): UseQRScannerReturn => {
  const [isScanning, setIsScanning] = useState(false);

  const startScanning = useCallback(() => {
    setIsScanning(true);
  }, []);

  const stopScanning = useCallback(() => {
    setIsScanning(false);
  }, []);

  const onQRCodeDetected = useCallback((code: string) => {
    console.log('QR Code détecté:', code);
    onScan(code);
    setIsScanning(false);
    toast.success('Code QR scanné avec succès !');
  }, [onScan]);

  return {
    isScanning,
    startScanning,
    stopScanning,
    onQRCodeDetected
  };
};
