import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

export const DnaAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd1fae5); // Mint green background
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create pill capsule
    const pillGroup = new THREE.Group();

    // Create the main body of the pill
    const capsuleGeometry = new THREE.CapsuleGeometry(0.5, 1.5, 20, 30);
    const capsuleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x15803d, // Dark green
      shininess: 100,
      specular: 0x666666
    });
    const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
    
    // Create the highlight/reflection effect
    const highlightGeometry = new THREE.CapsuleGeometry(0.48, 1.45, 20, 30);
    const highlightMaterial = new THREE.MeshPhongMaterial({
      color: 0x22c55e, // Lighter green
      shininess: 200,
      opacity: 0.3,
      transparent: true
    });
    const highlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    highlight.position.z = 0.1;
    highlight.position.x = -0.1;
    highlight.position.y = 0;

    pillGroup.add(capsule);
    pillGroup.add(highlight);

    // Add text to the pill
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
      const textGeometry = new TextGeometry('SupplementScribe', {
        font: font,
        size: 0.15,
        height: 0.02,
      });
      
      const textMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 100,
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      
      // Center the text
      textGeometry.computeBoundingBox();
      const textWidth = textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x;
      textMesh.position.set(-textWidth/2, 0, 0.52);
      textMesh.rotation.z = Math.PI / 6;
      
      pillGroup.add(textMesh);
    });
    
    // Rotate pill to match the reference image
    pillGroup.rotation.z = Math.PI / 6;
    scene.add(pillGroup);

    // Position camera
    camera.position.z = 5;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    // Animation variables
    let time = 0;
    const floatSpeed = 0.001;
    const floatAmplitude = 0.2;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Floating motion
      time += floatSpeed;
      pillGroup.position.y = Math.sin(time) * floatAmplitude;
      
      // Subtle rotation
      pillGroup.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-[400px] rounded-lg overflow-hidden"
      aria-label="3D Floating Pill Animation with SupplementScribe Text"
    />
  );
};