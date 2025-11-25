import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../data';

const Gallery: React.FC = () => {
	const project = PROJECTS.find((p) => p.id === '3');
	const images = project?.gallery && project.gallery.length > 0 ? project.gallery : (project?.imageUrl ? [project.imageUrl] : []);

	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setActiveIndex(null);
			if (e.key === 'ArrowRight' && activeIndex !== null) setActiveIndex((i) => (i! + 1) % images.length);
			if (e.key === 'ArrowLeft' && activeIndex !== null) setActiveIndex((i) => (i! - 1 + images.length) % images.length);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [activeIndex, images.length]);

	if (!images || images.length === 0) {
		return (
			<div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
				<h1 className="font-serif text-4xl text-stone-900 mb-6">Art Gallery</h1>
				<p className="text-stone-500">No artworks found. 请确保你的图片位于 <code>/public/images/artworks/</code> 并在 `data.ts` 中配置好 `gallery` 字段。</p>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
			<h1 className="font-serif text-4xl text-stone-900 mb-6">Art Gallery</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{images.map((src, idx) => (
					<button
						key={src}
						onClick={() => setActiveIndex(idx)}
						className="group overflow-hidden rounded-md bg-stone-100 aspect-[4/3] block w-full"
						aria-label={`Open artwork ${idx + 1}`}
					>
						<img
							src={src}
							alt={`Artwork ${idx + 1}`}
							className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
							onError={(e) => {
								e.currentTarget.style.display = 'none';
								const parent = e.currentTarget.parentElement as HTMLElement | null;
								if (parent) parent.classList.add('flex', 'items-center', 'justify-center', 'text-stone-300');
							}}
						/>
					</button>
				))}
			</div>

			{activeIndex !== null && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
					role="dialog"
					aria-modal="true"
					onClick={() => setActiveIndex(null)}
				>
					<div className="relative max-w-[95%] max-h-[95%]" onClick={(e) => e.stopPropagation()}>
						<button
							onClick={() => setActiveIndex(null)}
							className="absolute top-2 right-2 z-50 bg-white/90 rounded-full p-2"
							aria-label="Close"
						>
							✕
						</button>
						<img
							src={images[activeIndex]}
							alt={`Artwork ${activeIndex + 1}`}
							className="max-w-full max-h-[80vh] rounded-md shadow-lg mx-auto block"
						/>
						{images.length > 1 && (
							<>
								<button
									onClick={() => setActiveIndex((i) => (i! - 1 + images.length) % images.length)}
									className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2"
									aria-label="Previous"
								>
									‹
								</button>
								<button
									onClick={() => setActiveIndex((i) => (i! + 1) % images.length)}
									className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2"
									aria-label="Next"
								>
									›
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Gallery;