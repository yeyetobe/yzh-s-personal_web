import React from 'react';
import { useParams } from 'react-router-dom';
import { PROJECTS } from '../data';

const Gallery: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((project) => project.id === id);

  if (!project || !project.gallery) {
    return <div>Project not found or no gallery available.</div>;
  }

  return (
    <div className="gallery">
      <h1>{project.title} - Gallery</h1>
      <div className="gallery-grid">
        {project.gallery.map((image, index) => (
          <img key={index} src={image} alt={`Artwork ${index + 1}`} className="gallery-image" />
        ))}
      </div>
    </div>
  );
};

export default Gallery;