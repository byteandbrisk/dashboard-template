'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Search, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Dynamic import for Leaflet components (client-side only)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const MarkerClusterGroup = dynamic(() => import('react-leaflet-cluster'), { ssr: false });

interface CityLocation {
  name: string;
  lat: number;
  lng: number;
  users: number;
  country: string;
  color: string;
}

// 40 Major Indian Cities + 10 Global Cities
const cityLocations: CityLocation[] = [
  // Major Indian Cities (40)
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, users: 3250, country: 'India', color: '#0EA5E9' },
  { name: 'Delhi', lat: 28.7041, lng: 77.1025, users: 2980, country: 'India', color: '#6366F1' },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946, users: 2450, country: 'India', color: '#10B981' },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, users: 1890, country: 'India', color: '#F59E0B' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, users: 1720, country: 'India', color: '#EF4444' },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, users: 1650, country: 'India', color: '#8B5CF6' },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, users: 1540, country: 'India', color: '#EC4899' },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, users: 1420, country: 'India', color: '#14B8A6' },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873, users: 980, country: 'India', color: '#F97316' },
  { name: 'Surat', lat: 21.1702, lng: 72.8311, users: 890, country: 'India', color: '#06B6D4' },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462, users: 820, country: 'India', color: '#84CC16' },
  { name: 'Kanpur', lat: 26.4499, lng: 80.3319, users: 760, country: 'India', color: '#EAB308' },
  { name: 'Nagpur', lat: 21.1458, lng: 79.0882, users: 710, country: 'India', color: '#F43F5E' },
  { name: 'Indore', lat: 22.7196, lng: 75.8577, users: 680, country: 'India', color: '#3B82F6' },
  { name: 'Thane', lat: 19.2183, lng: 72.9781, users: 650, country: 'India', color: '#8B5CF6' },
  { name: 'Bhopal', lat: 23.2599, lng: 77.4126, users: 620, country: 'India', color: '#10B981' },
  { name: 'Visakhapatnam', lat: 17.6869, lng: 83.2185, users: 590, country: 'India', color: '#0EA5E9' },
  { name: 'Pimpri-Chinchwad', lat: 18.6298, lng: 73.7997, users: 560, country: 'India', color: '#F59E0B' },
  { name: 'Patna', lat: 25.5941, lng: 85.1376, users: 540, country: 'India', color: '#EF4444' },
  { name: 'Vadodara', lat: 22.3072, lng: 73.1812, users: 510, country: 'India', color: '#06B6D4' },
  { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538, users: 490, country: 'India', color: '#84CC16' },
  { name: 'Ludhiana', lat: 30.9010, lng: 75.8573, users: 470, country: 'India', color: '#F97316' },
  { name: 'Agra', lat: 27.1767, lng: 78.0081, users: 450, country: 'India', color: '#EC4899' },
  { name: 'Nashik', lat: 19.9975, lng: 73.7898, users: 430, country: 'India', color: '#14B8A6' },
  { name: 'Faridabad', lat: 28.4089, lng: 77.3178, users: 410, country: 'India', color: '#6366F1' },
  { name: 'Meerut', lat: 28.9845, lng: 77.7064, users: 390, country: 'India', color: '#8B5CF6' },
  { name: 'Rajkot', lat: 22.3039, lng: 70.8022, users: 370, country: 'India', color: '#10B981' },
  { name: 'Kalyan-Dombivli', lat: 19.2403, lng: 73.1305, users: 350, country: 'India', color: '#0EA5E9' },
  { name: 'Vasai-Virar', lat: 19.4612, lng: 72.7967, users: 330, country: 'India', color: '#F59E0B' },
  { name: 'Varanasi', lat: 25.3176, lng: 82.9739, users: 310, country: 'India', color: '#EF4444' },
  { name: 'Srinagar', lat: 34.0837, lng: 74.7973, users: 290, country: 'India', color: '#06B6D4' },
  { name: 'Aurangabad', lat: 19.8762, lng: 75.3433, users: 270, country: 'India', color: '#84CC16' },
  { name: 'Dhanbad', lat: 23.7957, lng: 86.4304, users: 250, country: 'India', color: '#F97316' },
  { name: 'Amritsar', lat: 31.6340, lng: 74.8723, users: 230, country: 'India', color: '#EC4899' },
  { name: 'Navi Mumbai', lat: 19.0330, lng: 73.0297, users: 210, country: 'India', color: '#14B8A6' },
  { name: 'Allahabad', lat: 25.4358, lng: 81.8463, users: 190, country: 'India', color: '#6366F1' },
  { name: 'Ranchi', lat: 23.3441, lng: 85.3096, users: 170, country: 'India', color: '#8B5CF6' },
  { name: 'Howrah', lat: 22.5958, lng: 88.2636, users: 150, country: 'India', color: '#10B981' },
  { name: 'Coimbatore', lat: 11.0168, lng: 76.9558, users: 130, country: 'India', color: '#0EA5E9' },
  { name: 'Vijayawada', lat: 16.5062, lng: 80.6480, users: 110, country: 'India', color: '#F59E0B' },

  // Global Cities (10)
  { name: 'New York', lat: 40.7128, lng: -74.0060, users: 1240, country: 'USA', color: '#0EA5E9' },
  { name: 'London', lat: 51.5074, lng: -0.1278, users: 890, country: 'UK', color: '#6366F1' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, users: 1580, country: 'Japan', color: '#10B981' },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, users: 620, country: 'Australia', color: '#F59E0B' },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333, users: 740, country: 'Brazil', color: '#EF4444' },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, users: 950, country: 'UAE', color: '#8B5CF6' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, users: 1120, country: 'Singapore', color: '#EC4899' },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, users: 780, country: 'France', color: '#14B8A6' },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050, users: 640, country: 'Germany', color: '#F97316' },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832, users: 710, country: 'Canada', color: '#06B6D4' },
];

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

export function MapsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);

  // Fix Leaflet icon issue in Next.js (client-side only)
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });
        setIsMapLoaded(true);
      });
    }
  }, []);

  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cityLocations;
    
    const query = searchQuery.toLowerCase();
    return cityLocations.filter(city =>
      city.name.toLowerCase().includes(query) ||
      city.country.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Search using Nominatim API
  const handleSearchOnMap = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a location to search');
      return;
    }

    // First check if it matches our predefined cities
    const exactMatch = cityLocations.find(
      city => city.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (exactMatch) {
      setSelectedLocation({
        lat: exactMatch.lat,
        lng: exactMatch.lng,
        name: exactMatch.name
      });
      
      // Fly to location on map
      if (mapRef.current) {
        mapRef.current.flyTo([exactMatch.lat, exactMatch.lng], 10, {
          duration: 1.5
        });
      }
      
      toast.success(`Found: ${exactMatch.name}, ${exactMatch.country}`);
      return;
    }

    // Search via Nominatim API
    setIsSearching(true);
    setSearchError('');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data: SearchResult[] = await response.json();

      if (data.length === 0) {
        setSearchError('Location not found. Try a different search term.');
        toast.error('Location not found');
        return;
      }

      const result = data[0];
      const location = {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        name: result.display_name.split(',')[0]
      };

      setSelectedLocation(location);

      // Fly to location on map
      if (mapRef.current) {
        mapRef.current.flyTo([location.lat, location.lng], 10, {
          duration: 1.5
        });
      }

      toast.success(`Found: ${result.display_name}`);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Failed to search. Please try again.');
      toast.error('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Enter key in search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchOnMap();
    }
  };

  // Click on location from list
  const handleLocationClick = (city: CityLocation) => {
    setSelectedLocation({
      lat: city.lat,
      lng: city.lng,
      name: city.name
    });

    if (mapRef.current) {
      mapRef.current.flyTo([city.lat, city.lng], 10, {
        duration: 1.5
      });
    }

    toast.success(`Viewing: ${city.name}, ${city.country}`);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto fade-in">
      {/* Header */}
      <div>
        <h2 className="mb-2">Maps & Geolocation</h2>
        <p className="text-[color:var(--text-muted)]">
          Interactive maps with {cityLocations.length} cities, location search, and geographic data visualization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Global User Distribution</CardTitle>
                <CardDescription>Real-time user locations across {cityLocations.length} major cities</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-lg overflow-hidden" style={{ height: '600px' }}>
              {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--surface-muted)]">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[color:var(--primary)]" />
                    <p className="text-sm text-[color:var(--text-muted)]">Loading map...</p>
                  </div>
                </div>
              )}
              {isMapLoaded && (
                <MapContainer
                  center={[20.5937, 78.9629]} // Center of India
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                  ref={mapRef}
                >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MarkerClusterGroup
                  chunkedLoading
                  maxClusterRadius={60}
                >
                  {filteredCities.map((city) => (
                    <Marker
                      key={`${city.name}-${city.country}`}
                      position={[city.lat, city.lng]}
                    >
                      <Popup>
                        <div className="text-center">
                          <div className="font-semibold text-base">{city.name}</div>
                          <div className="text-sm text-gray-600">{city.country}</div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">{city.users}</span> active users
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {city.lat.toFixed(4)}, {city.lng.toFixed(4)}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup>

                {/* Selected search result marker */}
                {selectedLocation && !cityLocations.find(c => c.lat === selectedLocation.lat && c.lng === selectedLocation.lng) && (
                  <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
                    <Popup>
                      <div className="text-center">
                        <div className="font-semibold">{selectedLocation.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location List & Search */}
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Location Search</CardTitle>
              <CardDescription>Find places anywhere in the world</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--text-muted)]" />
                <Input
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchError('');
                  }}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              
              {searchError && (
                <div className="flex items-center gap-2 text-sm text-[color:var(--danger)]">
                  <AlertCircle className="w-4 h-4" />
                  <span>{searchError}</span>
                </div>
              )}

              <Button 
                className="w-full" 
                onClick={handleSearchOnMap}
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Search on Map
                  </>
                )}
              </Button>

              {filteredCities.length > 0 && filteredCities.length < cityLocations.length && (
                <div className="text-sm text-[color:var(--text-muted)]">
                  Found {filteredCities.length} matching location(s)
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Top Locations</CardTitle>
              <CardDescription>Most active regions ({filteredCities.length} cities)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {filteredCities
                  .sort((a, b) => b.users - a.users)
                  .slice(0, 15)
                  .map((city, index) => (
                    <div
                      key={`${city.name}-${city.country}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-[color:var(--surface-muted)] transition-colors cursor-pointer"
                      onClick={() => handleLocationClick(city)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                          style={{ backgroundColor: city.color }}
                        >
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{city.name}</div>
                          <div className="text-xs text-[color:var(--text-muted)] truncate">
                            {city.country}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="flex-shrink-0">{city.users}</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
