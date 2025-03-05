
import React from 'react';
import Layout from '@/components/Layout';
import ImageGallery from '@/components/ImageGallery';

const galleryImages = [
  {
    id: 1,
    src: 'https://drive.google.com/file/d/1VSCFj8-dX5CDfEdQz0p2HR-X5e3YH8sV/view?usp=drive_link',
    alt: 'Vibrant orange flowers in close-up',
    title: 'Jeg tenker ikke på dere lenger ',
    year: '2024',
    medium: 'Ink on tille',
    dimensions: '80 × 100 cm',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80',
    alt: 'Serene river landscape with mountains',
    title: 'Mountain Stream',
    year: '2022',
    medium: 'Acrylic on canvas',
    dimensions: '60 × 90 cm',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    alt: 'Pine trees in a forest',
    title: 'Forest Whispers',
    year: '2021',
    medium: 'Mixed media',
    dimensions: '70 × 100 cm',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    alt: 'Low angle view of trees',
    title: 'Looking Up',
    year: '2023',
    medium: 'Photography',
    dimensions: '60 × 90 cm',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    alt: 'Sunlight through trees',
    title: 'Dappled Light',
    year: '2022',
    medium: 'Watercolor on paper',
    dimensions: '40 × 60 cm',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
    alt: 'Abstract orange composition',
    title: 'Warm Abstraction',
    year: '2021',
    medium: 'Digital art',
    dimensions: '50 × 70 cm',
  },
];

const Gallery = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Artwork</span>
            <h1 className="text-4xl md:text-5xl font-medium mt-2">Gallery</h1>
            <p className="mt-4 text-muted-foreground">
              Explore my collection of works spanning various mediums and themes.
              Each piece represents a unique perspective and emotional landscape.
            </p>
          </div>
          
          <ImageGallery images={galleryImages} columns={3} />
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
