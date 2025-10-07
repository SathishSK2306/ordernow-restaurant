import { useState, useEffect } from 'react';

/**
 * @typedef {object} Geolocation
 * @property {number} lat - The latitude.
 * @property {number} lng - The longitude.
 */

/**
 * @typedef {object} UseUserLocationReturn
 * @property {Geolocation | null} location - The user's coordinates, or null if not yet available.
 * @property {string | null} error - An error message if location could not be retrieved.
 * @property {boolean} isLoading - True while the location is being fetched.
 */

/**
 * A custom React hook to get the user's current geolocation.
 * Handles loading, error, and success states.
 * @returns {UseUserLocationReturn}
 */
export const useUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
      return;
    }

    // Success callback
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({
        lat: latitude,
        lng: longitude,
      });
      setIsLoading(false);
    };

    // Error callback
    const handleError = (err) => {
      let errorMessage = 'An unknown error occurred.';
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = 'Please allow location access to use this feature.';
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage = 'Your location information is unavailable.';
          break;
        case err.TIMEOUT:
          errorMessage = 'The request to get your location timed out.';
          break;
      }
      setError(errorMessage);
      setIsLoading(false);
    };

    // Options for the geolocation request
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    // Request the user's location
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);

  }, []); // The empty dependency array ensures this runs only once

  return { location, error, isLoading };
};