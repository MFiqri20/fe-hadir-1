// hooks/useGeolocation.ts
import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
    error: string | null;
  }>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({ ...prev, error: "Geolocation tidak didukung browser ini." }));
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const error = (err: GeolocationPositionError) => {
      setLocation((prev) => ({ ...prev, error: err.message }));
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return location;
};

export default useGeolocation;
