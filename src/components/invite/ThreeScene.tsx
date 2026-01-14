"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0b0b1a");

    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const spot = new THREE.SpotLight(0xffd700, 1.5);
    spot.position.set(5, 10, 10);
    scene.add(spot);

    const ringGeometry = new THREE.TorusGeometry(1, 0.3, 30, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 1,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.set(Math.PI / 3, 0, 0);
    ring2.rotation.set(-Math.PI / 3, 0, 0);
    ring2.position.x = 1.8;
    scene.add(ring1, ring2);

    const curtainMaterial = new THREE.MeshStandardMaterial({
      color: 0xaa3366,
      metalness: 0.1,
      roughness: 0.9,
      side: THREE.DoubleSide,
    });
    const curtainGeo = new THREE.PlaneGeometry(10, 20, 10, 10);

    const leftCurtain = new THREE.Mesh(curtainGeo, curtainMaterial);
    leftCurtain.position.set(-5, 0, 0);
    scene.add(leftCurtain);

    const rightCurtain = new THREE.Mesh(curtainGeo, curtainMaterial);
    rightCurtain.position.set(5, 0, 0);
    scene.add(rightCurtain);

    const particlesGeo = new THREE.BufferGeometry();
    const count = 400;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    gsap.to(camera.position, {
      scrollTrigger: {
        trigger: mountRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      z: 6,
    });

    gsap.to(leftCurtain.position, {
      scrollTrigger: {
        trigger: mountRef.current,
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
      x: -10,
    });

    gsap.to(rightCurtain.position, {
      scrollTrigger: {
        trigger: mountRef.current,
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
      x: 10,
    });

    gsap.to(ring1.rotation, {
      scrollTrigger: {
        trigger: mountRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      y: Math.PI * 4,
    });

    gsap.to(ring2.rotation, {
      scrollTrigger: {
        trigger: mountRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      y: -Math.PI * 4,
    });

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      ring1.rotation.x += 0.01;
      ring2.rotation.x += 0.01;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      curtainGeo.dispose();
      curtainMaterial.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
}
