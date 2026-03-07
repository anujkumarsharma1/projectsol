import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

// --- LOCAL F1 CAR MODEL ---
const MODEL_URL = "/oracle_red_bull_f1_car_rb19_2023/scene.gltf";

export const ThreeHero = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  
  const mountRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // 1. PRELOADER & START LOGIC
  // ==========================================
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setLoading(false);
    
    setTimeout(() => {
      setStarted(true);
      // UPDATED: Changed text to "SOLUTIONS 2K26"
      initParticleText("SOLUTIONS 2K26");
    }, 500);
  };

  // ==========================================
  // 2. PARTICLE TEXT EFFECT
  // ==========================================
  const initParticleText = (text: string) => {
    if (!textRef.current) return;
    
    const CELL_SIZE = 5;
    const CELL_DISTANCE = 7;
    const FONT_COLOR = '#ef4444'; // Red-500
    let ACTIVE_ELECTRONS: any[] = [];
    let PINNED_CELLS: any[] = [];
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    textRef.current.appendChild(canvas);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Electron {
        current: number[];
        destination: number[];
        lifeTime: number;
        expireAt: number;
        
        constructor(x: number, y: number) {
            this.lifeTime = 2000;
            this.expireAt = Date.now() + this.lifeTime;
            this.current = [x, y];
            this.destination = [x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30];
        }
        paint(context: CanvasRenderingContext2D) {
            this.current[0] += (this.destination[0] - this.current[0]) * 0.05;
            this.current[1] += (this.destination[1] - this.current[1]) * 0.05;
            context.globalAlpha = Math.max(0, (this.expireAt - Date.now()) / this.lifeTime);
            context.fillStyle = FONT_COLOR;
            context.fillRect(this.current[0], this.current[1], 2, 2);
        }
    }

    class Cell {
        x: number;
        y: number;
        constructor(row: number, col: number) {
            this.x = col * CELL_DISTANCE;
            this.y = row * CELL_DISTANCE;
        }
        paint(context: CanvasRenderingContext2D) {
            if (Math.random() > 0.985) ACTIVE_ELECTRONS.push(new Electron(this.x, this.y));
            context.globalAlpha = 0.25;
            context.fillStyle = FONT_COLOR;
            context.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE);
        }
    }

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;
    
    tempCtx.textAlign = 'center'; 
    tempCtx.textBaseline = 'middle';
    tempCtx.font = '900 200px "Orbitron", sans-serif'; 
    
    // Auto-scale text to fit screen
    const scale = (window.innerWidth * 0.85) / tempCtx.measureText(text).width;
    tempCtx.font = `900 ${200 * scale}px "Orbitron", sans-serif`;
    
    tempCtx.fillStyle = 'white';
    tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2 + 100);

    const data = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;
    for (let i = 0; i < tempCanvas.height; i += CELL_DISTANCE) {
        for (let j = 0; j < tempCanvas.width; j += CELL_DISTANCE) {
            if (data[(j + i * tempCanvas.width) * 4 + 3] > 128) {
                PINNED_CELLS.push(new Cell(i / CELL_DISTANCE, j / CELL_DISTANCE));
            }
        }
    }

    const loop = () => {
        if (!textRef.current) return;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
        
        PINNED_CELLS.forEach(c => c.paint(ctx));
        
        const now = Date.now();
        ACTIVE_ELECTRONS = ACTIVE_ELECTRONS.filter(e => {
            if (now > e.expireAt) return false;
            e.paint(ctx);
            return true;
        });
        requestAnimationFrame(loop);
    };
    loop();
  };

  // ==========================================
  // 3. THREE.JS (F1 Car)
  // ==========================================
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced ambient light for better visibility
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    // Main directional light (key light)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    // Fill light from the other side
    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.8);
    fillLight.position.set(-5, 5, 3);
    scene.add(fillLight);

    // Red accent spotlights from sides
    const createMoodLight = (x: number, tx: number, intensity: number) => {
        const l = new THREE.SpotLight(0xff0000, intensity, 18, 0.4, 0.5, 1.5);
        l.position.set(x, 5, 4);
        l.castShadow = true;
        scene.add(l);
        const t = new THREE.Object3D();
        t.position.set(tx, 0, 0); 
        scene.add(t);
        l.target = t;
    };
    createMoodLight(-6, 1, 80);
    createMoodLight(6, -1, 80);

    // Front highlight
    const frontLight = new THREE.PointLight(0xffffff, 2, 15);
    frontLight.position.set(0, 2, 5);
    scene.add(frontLight);

    // Back rim light for dramatic effect
    const rimLight = new THREE.PointLight(0xff3333, 3, 12);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // LOAD MODEL
    const loader = new GLTFLoader();
    
    loader.load(MODEL_URL, (g) => {
        const car = g.scene; 
        car.scale.set(2.2, 2.2, 2.2); 
        car.traverse((n) => { 
            if ((n as THREE.Mesh).isMesh) { 
                n.castShadow = true; 
                n.receiveShadow = true; 
                const mesh = n as THREE.Mesh;
                if (mesh.material) { 
                    const material = mesh.material as THREE.MeshStandardMaterial;
                    material.roughness = 0.3; 
                    material.metalness = 0.95; 
                    material.envMapIntensity = 1.5;
                }
            }
        });
        
        const box = new THREE.Box3().setFromObject(car);
        const center = box.getCenter(new THREE.Vector3());
        car.position.sub(center);
        car.position.set(0, 0, 0);
        car.rotation.y = 0; // Centered front view
        scene.add(car);
    }, undefined, (error) => {
        console.error("Error loading model:", error);
    });

    const animate = () => {
        requestAnimationFrame(animate);
        scene.traverse((o) => { 
            if (o.type === 'Group') {
                o.rotation.y += 0.003; // Slightly faster rotation
            }
        });
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        if (mountRef.current) mountRef.current.innerHTML = '';
        renderer.dispose();
    };
  }, []);

  // ==========================================
  // 4. OGL (Light Rays)
  // ==========================================
  useEffect(() => {
    if (!raysRef.current) return;

    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    raysRef.current.appendChild(gl.canvas);

    const vertex = `
      attribute vec2 position; 
      varying vec2 vUv; 
      void main() { 
        vUv = position * 0.5 + 0.5; 
        gl_Position = vec4(position, 0.0, 1.0); 
      }
    `;

    const fragment = `
        precision highp float;
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec3 raysColor;
        uniform vec2 rayPos;
        uniform vec2 rayDir;
        uniform float raysSpeed;
        uniform float lightSpread;
        uniform float rayLength;
        uniform float mouseInfluence;
        uniform vec2 mousePos;
        
        float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
            vec2 sourceToCoord = coord - raySource;
            vec2 dirNorm = normalize(sourceToCoord);
            float cosAngle = dot(dirNorm, rayRefDirection);
            float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.001));
            float distance = length(sourceToCoord);
            float maxDistance = iResolution.x * rayLength;
            float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
            float baseStrength = clamp((0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) + (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)), 0.0, 1.0);
            return baseStrength * lengthFalloff * spreadFactor;
        }
        
        void main() {
            vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
            vec2 finalRayDir = rayDir;
            if (mouseInfluence > 0.0) {
                vec2 mouseDirection = normalize((mousePos * iResolution) - rayPos);
                finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
            }
            float r1 = rayStrength(rayPos, finalRayDir, coord, 36.22, 21.11, 1.5 * raysSpeed);
            float r2 = rayStrength(rayPos, finalRayDir, coord, 22.39, 18.02, 1.1 * raysSpeed);
            vec3 finalColor = raysColor * (r1 * 0.5 + r2 * 0.4);
            float brightness = 1.0 - (coord.y / iResolution.y);
            finalColor *= (0.3 + brightness * 0.7);
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    const mouse = new Float32Array([0.5, 0.5]);
    const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([window.innerWidth, window.innerHeight]) },
        raysColor: { value: new Float32Array([1.0, 0.0, 0.0]) }, 
        rayPos: { value: new Float32Array([window.innerWidth / 2, -500]) },
        rayDir: { value: new Float32Array([0, 1]) },
        raysSpeed: { value: 1.2 },
        lightSpread: { value: 0.8 },
        rayLength: { value: 1.5 },
        mouseInfluence: { value: 0.15 },
        mousePos: { value: mouse }
    };

    const program = new Program(gl, { vertex, fragment, uniforms, transparent: true });
    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.iResolution.value.set([window.innerWidth, window.innerHeight]);
        uniforms.rayPos.value.set([window.innerWidth / 2, -window.innerHeight * 0.6]);
    };
    window.addEventListener('resize', resize);
    
    const handleMouseMove = (e: MouseEvent) => {
        mouse[0] = e.clientX / window.innerWidth;
        mouse[1] = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();

    let animationId: number;
    const update = (t: number) => {
        animationId = requestAnimationFrame(update);
        uniforms.iTime.value = t * 0.001;
        renderer.render({ scene: mesh });
    };
    animationId = requestAnimationFrame(update);

    return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationId);
        if (raysRef.current) raysRef.current.innerHTML = '';
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden font-sans">
        
        {/* --- LOADER OVERLAY --- */}
        <div 
            className={`fixed inset-0 bg-black flex flex-col justify-center items-center z-[9999] transition-all duration-1000 ${loading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        >
             <div className="text-center">
                {progress < 100 ? (
                    <>
                        {/* UPDATED: Loading Text */}
                        <div className="text-red-600 text-3xl sm:text-5xl font-black italic tracking-[8px] sm:tracking-[12px] mb-5 drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]">
                            SOLUTIONS 2K26
                        </div>
                        <div className="w-[300px] h-0.5 bg-red-900/30 mx-auto relative overflow-hidden">
                            <div 
                                className="h-full bg-red-600 shadow-[0_0_15px_#ff0000] transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }} 
                            />
                        </div>
                        <div className="text-red-600 mt-4 font-mono text-xl tracking-widest">{progress}%</div>
                    </>
                ) : (
                    <button 
                        onClick={handleStart}
                        className="mt-5 bg-transparent border-2 border-red-600 text-red-600 px-8 py-3 font-black italic uppercase tracking-[4px] hover:bg-red-600 hover:text-black hover:shadow-[0_0_25px_#ff0000] transition-all duration-300"
                    >
                        Click to Start
                    </button>
                )}
             </div>
        </div>

        {/* --- HERO CONTENTS --- */}
        <div className={`transition-opacity duration-[2000ms] ${started ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Nav Bar */}
            <nav className="absolute top-0 w-full flex justify-between items-center px-12 py-6 bg-gradient-to-b from-red-900/20 via-black/80 to-transparent border-t-[3px] border-red-600 z-50">
                <div className="text-red-600 font-black italic text-3xl tracking-widest drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                    solutions
                </div>
                <div className="hidden md:flex gap-8">
                    {['Events', 'Sponsors', 'Team', 'Gallery'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-white/80 uppercase text-sm font-bold tracking-widest hover:text-red-500 hover:shadow-[0_0_10px_#ff0000] transition-all">
                            {item}
                        </a>
                    ))}
                </div>
            </nav>

            {/* Background Text "TB" */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -skew-x-[10deg] text-[55vw] font-black italic text-transparent pointer-events-none z-0 select-none"
                 style={{ 
                     WebkitTextStroke: '2px rgba(255, 0, 0, 0.03)',
                     background: 'linear-gradient(to bottom, rgba(255, 0, 0, 0.05), rgba(255, 255, 255, 0.01))',
                     WebkitBackgroundClip: 'text',
                     filter: 'blur(2px)'
                 }}
            >
                TB
            </div>

            {/* Layers */}
            <div ref={raysRef} className="absolute inset-0 z-10 pointer-events-none" /> 
            <div ref={mountRef} className="absolute inset-0 z-20" /> 
            <div ref={textRef} className="absolute inset-0 z-50 pointer-events-none mix-blend-screen" /> 

            {/* Bottom Light Bar Animation */}
            <div className="absolute top-[18%] left-1/2 -translate-x-1/2 flex gap-5 z-30">
                 {[...Array(5)].map((_, i) => (
                     <div key={i} className="w-20 h-2.5 bg-gradient-to-b from-red-600 to-red-900 relative animate-pulse">
                         <div className="absolute top-0 left-2.5 w-14 h-2.5 bg-[#ff3333] shadow-[0_0_40px_8px_#ff0000]" />
                     </div>
                 ))}
            </div>
        </div>
    </section>
  );
};