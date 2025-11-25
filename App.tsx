import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Twitter, Linkedin, ArrowRight, ArrowUpRight, ChevronLeft } from 'lucide-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ViewState } from './types';
import { PROFILE, PROJECTS, BLOG_POSTS } from './data';
import MarkdownRenderer from './components/MarkdownRenderer';
import AIChat from './components/AIChat';
import Gallery from './components/Gallery';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (newView: ViewState) => {
    setView(newView);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const NavItem = ({ label, target, active }: { label: string, target: ViewState, active: boolean }) => (
    <button
      onClick={() => navigate(target)}
      className={`text-sm tracking-wide transition-all duration-300 ${
        active ? 'text-stone-900 border-b border-stone-900' : 'text-stone-500 hover:text-stone-900'
      }`}
    >
      {label}
    </button>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans text-stone-800 selection:bg-stone-200">
            
            {/* Minimal Header */}
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'py-4 bg-[#fafaf9]/90 backdrop-blur-sm' : 'py-8 md:py-12 bg-transparent'}`}>
              <div className="max-w-5xl mx-auto px-6 md:px-12 flex items-center justify-between">
                <button onClick={() => navigate({ type: 'home' })} className="font-serif text-2xl font-bold tracking-tight text-stone-900 z-50 relative">
                  {PROFILE.name.split(' ')[0]}.
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                  <NavItem label="Overview" target={{ type: 'home' }} active={view.type === 'home'} />
                  <NavItem label="Selected Works" target={{ type: 'projects' }} active={view.type === 'projects'} />
                  <NavItem label="Journal" target={{ type: 'blog' }} active={view.type === 'blog' || view.type === 'post'} />
                </nav>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-stone-900 z-50 relative" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

              {/* Mobile Fullscreen Nav */}
              <div className={`fixed inset-0 bg-[#fafaf9] z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                  <button onClick={() => navigate({ type: 'home' })} className="font-serif text-4xl text-stone-900">Overview</button>
                  <button onClick={() => navigate({ type: 'projects' })} className="font-serif text-4xl text-stone-900">Projects</button>
                  <button onClick={() => navigate({ type: 'blog' })} className="font-serif text-4xl text-stone-900">Journal</button>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 pt-32 pb-20">
              <div className="max-w-5xl mx-auto px-6 md:px-12">
                
                {/* HOME VIEW */}
                {view.type === 'home' && (
                  <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
                    <section className="py-12 md:py-24 max-w-3xl">
                      <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-stone-900 mb-8">
                        {PROFILE.title}
                      </h1>
                      <p className="text-lg md:text-xl text-stone-500 leading-relaxed max-w-xl mb-12 font-light">
                        {PROFILE.bio}
                      </p>
                      <div className="flex gap-6 items-center">
                         <button onClick={() => navigate({ type: 'projects' })} className="group flex items-center gap-2 text-stone-900 border-b border-stone-300 pb-1 hover:border-stone-900 transition-colors">
                           View Projects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                         </button>
                         <div className="flex gap-4">
                          {PROFILE.socials.github && <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors"><Github className="w-5 h-5" /></a>}
                          {PROFILE.socials.twitter && <a href={PROFILE.socials.twitter} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors"><Twitter className="w-5 h-5" /></a>}
                          {PROFILE.socials.linkedin && <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors"><Linkedin className="w-5 h-5" /></a>}
                         </div>
                      </div>
                    </section>

                    {/* Minimal Featured Projects */}
                    <section className="py-20 border-t border-stone-200">
                      <div className="flex justify-between items-baseline mb-12">
                        <h2 className="font-serif text-3xl text-stone-900 italic">Selected Works</h2>
                        <button onClick={() => navigate({ type: 'projects' })} className="text-sm text-stone-500 hover:text-stone-900 transition-colors">All Projects</button>
                      </div>
                      
                      <div className="space-y-20">
                        {PROJECTS.filter(p => p.featured).slice(0, 2).map((project, index) => (
                          <div key={project.id} className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start group cursor-pointer`} onClick={() => {
                              if (project.id === '3') {
                                navigate({ type: 'gallery' });
                              } else if (project.link) {
                                window.open(project.link, '_blank');
                              } else if (project.github) {
                                window.open(project.github, '_blank');
                              }
                            }}>
                            <div className={`w-full md:w-3/5 aspect-[16/10] bg-stone-100 overflow-hidden relative order-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                               {/* Image handling: Use object-cover. In real deployment, these come from 'public/images/' */}
                               <img 
                                  src={project.imageUrl} 
                                  alt={project.title} 
                                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105" 
                                  onError={(e) => {
                                    // Fallback if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'text-stone-300', 'font-serif', 'italic', 'text-2xl');
                                    if(e.currentTarget.parentElement) e.currentTarget.parentElement.innerText = project.title;
                                  }}
                                />
                            </div>
                            <div className={`flex-1 pt-4 order-2 ${index % 2 === 1 ? 'md:order-1 md:text-right items-end' : ''}`}>
                              <div className="text-xs font-mono text-stone-400 mb-4 uppercase tracking-widest">{project.techStack[0]}</div>
                              <h3 className="font-serif text-3xl text-stone-900 mb-4 group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                              <p className="text-stone-500 leading-relaxed mb-6 font-light">{project.description}</p>
                              <span className="inline-flex items-center text-sm text-stone-900 font-medium">
                                Visit Site {(project.link || project.github) && <ArrowUpRight className="w-4 h-4 ml-1" />}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {/* PROJECTS VIEW */}
                {view.type === 'projects' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-16 md:mb-24 pt-8">
                      <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6">Works</h1>
                      <p className="text-lg text-stone-500 font-light max-w-xl">
                        A curated collection of digital products, interfaces, and experiments.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
                      {PROJECTS.map(project => (
                        <div key={project.id} className="group cursor-pointer block" onClick={() => {
                          if (project.id === '3') {
                            navigate({ type: 'gallery' });
                          } else if (project.link) {
                            window.open(project.link, '_blank');
                          } else if (project.github) {
                            window.open(project.github, '_blank');
                          }
                        }}>
                          <div className="aspect-[4/3] mb-6 overflow-hidden bg-stone-100 relative">
                             <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-stone-200', 'text-stone-400');
                                }}
                              />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-serif text-2xl text-stone-900 mb-2">{project.title}</h3>
                              <p className="text-stone-500 text-sm leading-relaxed max-w-sm font-light">{project.description}</p>
                            </div>
                            {project.link && <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-stone-900 transition-colors" />}
                          </div>
                          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                            {project.techStack.map(tech => (
                              <span key={tech} className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GALLERY VIEW */}
                {view.type === 'gallery' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Gallery />
                  </div>
                )}

                {/* BLOG LIST VIEW */}
                {view.type === 'blog' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-16 md:mb-24 pt-8 border-b border-stone-200 pb-12">
                      <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6">Journal</h1>
                      <p className="text-lg text-stone-500 font-light">
                        Notes on engineering, design, and aesthetics.
                      </p>
                    </div>
                    <div className="max-w-2xl">
                      {BLOG_POSTS.map(post => (
                        <article 
                          key={post.id} 
                          className="group cursor-pointer py-10 border-b border-stone-100 first:pt-0" 
                          onClick={() => navigate({ type: 'post', postId: post.id })}
                        >
                          <div className="flex items-baseline justify-between mb-3">
                            <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">{post.category}</span>
                            <time className="text-xs font-mono text-stone-400">{post.date}</time>
                          </div>
                          <h2 className="font-serif text-3xl text-stone-900 mb-4 group-hover:text-stone-600 transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-stone-500 leading-relaxed font-light mb-4">
                            {post.summary}
                          </p>
                          <div className="text-sm text-stone-900 underline decoration-stone-300 underline-offset-4 group-hover:decoration-stone-900 transition-all">
                            Read Entry
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* BLOG POST DETAIL VIEW */}
                {view.type === 'post' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                   {(() => {
                    const post = BLOG_POSTS.find(p => p.id === view.postId);
                    if (!post) return <div>Post not found</div>;
                    
                    return (
                      <article className="max-w-2xl mx-auto pt-8">
                        <button 
                          onClick={() => navigate({ type: 'blog' })}
                          className="group flex items-center text-sm text-stone-400 hover:text-stone-900 mb-12 transition-colors font-mono"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          BACK TO JOURNAL
                        </button>
                        
                        <header className="mb-12 text-center">
                          <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-4">
                            {post.category} • {post.readTime}
                          </div>
                          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
                            {post.title}
                          </h1>
                          <time className="text-stone-400 italic font-serif">{post.date}</time>
                        </header>
                        
                        <div className="prose-container">
                          <MarkdownRenderer content={post.content} />
                        </div>
                        
                        <div className="mt-20 pt-12 border-t border-stone-200 flex justify-center">
                           <span className="font-serif italic text-2xl text-stone-300">End.</span>
                        </div>
                      </article>
                    );
                  })()}
                </div>
                )}
              </div>
            </main>

            {/* Minimal Footer */}
            <footer className="py-12 border-t border-stone-100">
              <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="font-serif text-stone-900 text-lg">
                  {PROFILE.name}
                </p>
                <div className="flex gap-8 text-sm text-stone-500 font-light">
                   <span>© {new Date().getFullYear()}</span>
                   <a href="#" className="hover:text-stone-900">Email</a>
                   <a href="#" className="hover:text-stone-900">LinkedIn</a>
                </div>
              </div>
            </footer>

            {/* AI Widget */}
            <AIChat />
          </div>
        } />
        <Route path="/gallery/:id" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;