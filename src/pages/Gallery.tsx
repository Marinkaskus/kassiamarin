import React from 'react';
import Layout from '@/components/Layout';
import ImageGallery from '@/components/ImageGallery';

const galleryImages = [
  {
    id: 1,
    src: 'https://dl.dropboxusercontent.com/s/27a0haknzoxvlpwuxpzrk/2L5A5963-1.CR3?rlkey=e9w5ufxplj9s78aetthnljep5&st=01fqm0yn&dl=0',
    alt: 'Jeg tenker ikke på dere lengre close-up',
    title: 'Jeg tenker ikke på dere lenger ',
    year: '2024',
    medium: 'Installasjon; Ink on tille',
    dimensions: '7 x 2 m',
    Prosjekt: 'Et område dekket av fliser. Gulvet du går på er utsmykket med oppslukende, varierte og skjøre malerier, som flyter inn og ut av hverandre. Maleriene forteller om minner, drømmer og mareritt – alt som foregår i tankenes verden, de søvnløse nettene når det eneste selskapet man har er sin egen fortid og fantasi. Gjennom handlingen av å gå på flisene, forandrer tilskueren verket og blir en del av det.',
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
             <h1 className="text-4xl md:text-5xl font-Prosjekt mt-2">Gallery</h1>
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
