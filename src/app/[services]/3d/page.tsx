'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Play } from 'lucide-react';

// Type definitions
type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
};

// Product Card component
const ProductCard = React.memo(({ product, onPlay }: { product: Product; onPlay: (product: Product) => void }) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle>{product.name}</CardTitle>
      <CardDescription>{product.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
        <img src={product.thumbnail} alt={product.name} className="object-cover w-full h-full" />
        <Button variant="secondary" size="icon" className="absolute inset-0 m-auto" onClick={() => onPlay(product)}>
          <Play className="h-6 w-6" />
        </Button>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm">Learn More</Button>
    </CardFooter>
  </Card>
));

ProductCard.displayName = 'ProductCard';

// Video player component
const VideoPlayer = ({ video, onClose }: { video: Product | null; onClose: () => void }) => {
  const getYouTubeEmbedUrl = useCallback((url: string) => {
    const match = url.match(/(?:youtu\.be|youtube\.com)\/(?:watch\?v=)?(.+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }, []);

  return (
    <Dialog open={!!video} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{video?.name}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video">
          {video?.videoUrl.includes('youtube') && (
            <iframe
              src={getYouTubeEmbedUrl(video.videoUrl)}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Product list
const products: Product[] = [
  { id: 1, name: "Sleek Smartwatch", description: "A cutting-edge wearable with stunning 3D interface", category: "Electronics", thumbnail: "/api/placeholder/600/400", videoUrl: "https://youtu.be/QUvezeF6_XE?list=RDjKu_UaAqP_U" },
  { id: 2, name: "Ergonomic Office Chair", description: "Experience comfort with our 360° rotating chair", category: "Furniture", thumbnail: "/api/placeholder/600/400", videoUrl: "https://youtu.be/2f0LZr7q-GA?list=RDjKu_UaAqP_U"},
  { id: 3, name: "Futuristic Drone", description: "Capture breathtaking aerial footage with precision", category: "Electronics", thumbnail: "/api/placeholder/600/400", videoUrl: "#" },
  { id: 4, name: "Designer Sunglasses", description: "Stylish protection with a 3D showcased design", category: "Fashion", thumbnail: "/api/placeholder/600/400", videoUrl: "#" },
  { id: 5, name: "Smart Home Hub", description: "Control your entire home with this sleek 3D-modeled device", category: "Electronics", thumbnail: "/api/placeholder/600/400", videoUrl: "#" },
  { id: 6, name: "Electric Skateboard", description: "Cruise in style with our 3D-animated board", category: "Sports", thumbnail: "/api/placeholder/600/400", videoUrl: "#" },
];

// Main component
const Custom3DProductVideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handlePlayVideo = useCallback((product: Product) => setSelectedVideo(product), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8">3D Product Videos</h1>
        <Input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onPlay={handlePlayVideo} />
          ))}
        </div>
        <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      </motion.div>
    </div>
  );
};

export default Custom3DProductVideosPage;
