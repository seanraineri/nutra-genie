import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';

export const DnaCapsuleMorph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    
    // Renderer setup with WebGL
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // DNA helix creation using ParametricGeometry
    const dnaGeometry = new THREE.ParametricGeometry((u, v, target) => {
      const radius = 2;
      const height = 5;
      const turns = 2;
      
      const x = radius * Math.cos(2 * Math.PI * u);
      const y = height * (v - 0.5);
      const z = radius * Math.sin(2 * Math.PI * u);
      
      target.set(x, y, z);
    }, 50, 50);

    const dnaMaterial = new THREE.MeshPhongMaterial({
      color: 0x1D4ED8,
      emissive: 0x60A5FA,
      emissiveIntensity: 0.2,
      shininess: 50
    });

    const dna = new THREE.Mesh(dnaGeometry, dnaMaterial);
    scene.add(dna);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Particle system
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x60A5FA,
      size: 0.05,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Camera positioning
    camera.position.z = 10;

    // Animation loop
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      if (inView) {
        dna.rotation.y += 0.01;
        particleSystem.rotation.y += 0.002;
        
        // Gentle pulsing effect
        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.005;
        dna.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Responsive handling
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      dnaGeometry.dispose();
      dnaMaterial.dispose();
    };
  }, [inView]);

  return (
    <div 
      ref={(el) => {
        containerRef.current = el;
        inViewRef(el);
      }}
      className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
    />
  );
};
