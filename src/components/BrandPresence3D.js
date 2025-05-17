import React, { useRef, useEffect, useState, useContext } from 'react';
import { Box, Typography, Fade, CircularProgress } from '@mui/material';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../data/translations';

const BrandPresence3D = ({ data, loading }) => {
  const mountRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Language context
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  // Create a new scene when data changes
  useEffect(() => {
    if (loading || !data || data.length === 0 || !mountRef.current) {
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111122);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add stars background
    const stars = new THREE.BufferGeometry();
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    stars.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });
    
    const starField = new THREE.Points(stars, starMaterial);
    scene.add(starField);

    // Colors for each platform type
    const platformColors = {
      instagram: 0xE1306C,  // Instagram pink
      facebook: 0x4267B2,   // Facebook blue
      '2gis': 0x3EBC42,     // 2GIS green
      booking: 0x003580,    // Booking.com blue
      tripadvisor: 0x00AA6C, // TripAdvisor green
      googlemaps: 0x4285F4  // Google Maps blue
    };

    // Create a group to hold all platforms
    const platformGroup = new THREE.Group();
    scene.add(platformGroup);

    // Add central sphere
    const centerGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const centerMaterial = new THREE.MeshPhongMaterial({
      color: 0x3a7bd5,
      emissive: 0x3a7bd5,
      emissiveIntensity: 0.2,
      shininess: 80
    });
    const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
    platformGroup.add(centerSphere);

    // Create text renderer for platform labels
    const createTextSprite = (text, color = 0xffffff) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 128;

      // Set background to be transparent
      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Text styles
      context.font = '24px Arial, sans-serif';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // Apply text shadow for better visibility
      context.shadowColor = 'rgba(0, 0, 0, 0.8)';
      context.shadowBlur = 7;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      
      // Draw text
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      // Canvas contents as texture
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      
      // Create material and sprite
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true
      });
      
      return new THREE.Sprite(spriteMaterial);
    };

    // Add platforms
    data.forEach((platform, index) => {
      // Calculate position in orbit
      const angle = (index / data.length) * Math.PI * 2;
      const orbitRadius = 4;
      const x = Math.sin(angle) * orbitRadius;
      const z = Math.cos(angle) * orbitRadius;
      
      // Calculate size based on followers
      const size = (platform.followers / 50000) * 0.7 + 0.3;
      
      // Create sphere for platform
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: platformColors[platform.icon] || 0x3a7bd5,
        emissive: platformColors[platform.icon] || 0x3a7bd5,
        emissiveIntensity: 0.2,
        shininess: 80
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, 0, z);
      sphere.userData = {
        platform,
        orbitAngle: angle,
        orbitRadius,
        orbitSpeed: 0.001 * (1 + platform.growth / 10) // Speed based on growth rate
      };
      
      platformGroup.add(sphere);
      
      // Add name label
      const label = createTextSprite(platform.name, platformColors[platform.icon]);
      label.position.set(0, size + 0.3, 0);
      label.scale.set(1.5, 0.75, 1);
      sphere.add(label);
      
      // Add orbit path
      const orbitCurve = new THREE.EllipseCurve(
        0, 0,
        orbitRadius, orbitRadius,
        0, 2 * Math.PI,
        false,
        0
      );
      
      const orbitPoints = orbitCurve.getPoints(50);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMaterial = new THREE.LineBasicMaterial({ 
        color: platformColors[platform.icon] || 0x3a7bd5,
        transparent: true,
        opacity: 0.3
      });
      
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      platformGroup.add(orbit);
      
      // Add particle effects
      const particleCount = Math.floor(20 * (platform.growth / 5));
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const particleAngle = Math.random() * Math.PI * 2;
        const particleRadius = size * (1.2 + Math.random() * 0.5);
        
        particlePositions[i3] = Math.sin(particleAngle) * particleRadius;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * particleRadius;
        particlePositions[i3 + 2] = Math.cos(particleAngle) * particleRadius;
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: platformColors[platform.icon] || 0x3a7bd5,
        size: 0.05,
        transparent: true,
        opacity: 0.6
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      sphere.add(particles);
    });

    // Add center label
    const centerLabel = createTextSprite("MarketInn");
    centerLabel.position.set(0, 0.7, 0);
    centerLabel.scale.set(1.5, 0.75, 1);
    centerSphere.add(centerLabel);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.minDistance = 3;
    controls.maxDistance = 20;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Move platforms in orbit
      platformGroup.children.forEach(child => {
        if (child.type === 'Mesh' && child.userData.platform) {
          const { orbitAngle, orbitRadius, orbitSpeed } = child.userData;
          child.userData.orbitAngle += orbitSpeed;
          child.position.x = Math.sin(child.userData.orbitAngle) * orbitRadius;
          child.position.z = Math.cos(child.userData.orbitAngle) * orbitRadius;
        }
      });
      
      // Pulse center sphere
      const time = Date.now() * 0.001;
      centerSphere.scale.set(
        1 + 0.1 * Math.sin(time),
        1 + 0.1 * Math.sin(time),
        1 + 0.1 * Math.sin(time)
      );
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    setIsInitialized(true);

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial resize
    setTimeout(handleResize, 100);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      if (controls) controls.dispose();
    };
  }, [data, loading, language, t]);

  return (
    <Box sx={{ 
      position: 'relative', 
      height: '500px', 
      minHeight: '500px',
      overflow: 'hidden'
    }}>
      <Box 
        ref={mountRef} 
        sx={{ 
          width: '100%', 
          height: '100%',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      />
      
      {loading && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}>
          <CircularProgress />
        </Box>
      )}
      
      <Fade in={isInitialized && !loading} timeout={1000}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            left: 10,
            p: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: 'rgba(0,0,0,0.6)',
            borderRadius: 2,
            color: 'white',
            fontSize: '0.75rem',
            zIndex: 2
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold', mb: 0.5 }}>
              {t.followersSize}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              {t.growthSpeed}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold', mb: 0.5 }}>
              {t.socialPresence}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              {t.interactions}
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default BrandPresence3D; 