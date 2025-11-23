"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Grid } from "@react-three/drei";
import { Loader2, Maximize2, Minimize2, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

interface Model3DProps {
  url: string;
  onLoad?: () => void;
}

function Model3D({ url, onLoad }: Model3DProps) {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load model based on file extension
  useEffect(() => {
    const loadModel = async () => {
      try {
        const extension = url.split(".").pop()?.toLowerCase();
        let loadedModel: THREE.Group;

        if (extension === "stl") {
          const loader = new STLLoader();
          const geometry = await loader.loadAsync(url);
          const material = new THREE.MeshStandardMaterial({
            color: 0x06b6d4,
            metalness: 0.3,
            roughness: 0.7,
          });
          const mesh = new THREE.Mesh(geometry, material);
          loadedModel = new THREE.Group();
          loadedModel.add(mesh);
        } else if (extension === "obj") {
          const loader = new OBJLoader();
          loadedModel = await loader.loadAsync(url);
          loadedModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x06b6d4,
                metalness: 0.3,
                roughness: 0.7,
              });
            }
          });
        } else {
          throw new Error("Unsupported file format. Please use STL or OBJ files.");
        }

        setModel(loadedModel);
        onLoad?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load model");
      }
    };

    loadModel();
  }, [url, onLoad]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <p className="text-red-400 mb-2">{error}</p>
        <p className="text-sm text-muted-foreground">
          Please check the file format and try again.
        </p>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  return <primitive object={model} />;
}

interface ModelViewer3DProps {
  modelUrl?: string;
  fallbackImage?: string;
  className?: string;
  alt?: string;
}

export function ModelViewer3D({
  modelUrl,
  fallbackImage,
  className,
  alt = "3D Model",
}: ModelViewer3DProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check WebGL support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setIsWebGLSupported(!!gl);
    }
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const exportScreenshot = () => {
    if (!canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "3d-model-screenshot.png";
    link.href = dataURL;
    link.click();
  };

  const resetView = () => {
    // Reset camera position - this would need to be implemented with camera ref
    // For now, just reload the model
    window.location.reload();
  };

  if (!isWebGLSupported) {
    return (
      <div
        className={cn(
          "relative aspect-square rounded-md overflow-hidden",
          "bg-white/90 dark:bg-black/50 backdrop-blur border border-slate-200 dark:border-white/10",
          "flex items-center justify-center",
          className
        )}
      >
        {fallbackImage ? (
          <img
            src={fallbackImage}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-6">
            <p className="text-sm text-muted-foreground">
              WebGL not supported on this device.
            </p>
          </div>
        )}
      </div>
    );
  }

  if (!modelUrl) {
    return (
      <div
        className={cn(
          "relative aspect-square rounded-md overflow-hidden",
          "bg-white/90 dark:bg-black/50 backdrop-blur border border-slate-200 dark:border-white/10",
          className
        )}
      >
        {fallbackImage ? (
          <img
            src={fallbackImage}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageSkeleton className="w-full h-full" />
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-square rounded-md overflow-hidden",
        "bg-slate-900 border border-slate-200 dark:border-white/10",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
    >
      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          size="icon"
          variant="secondary"
          onClick={resetView}
          className="glass-card border-white/10"
          aria-label="Reset view"
        >
          <RotateCcw size={16} />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={exportScreenshot}
          className="glass-card border-white/10"
          aria-label="Export screenshot"
        >
          <Download size={16} />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={toggleFullscreen}
          className="glass-card border-white/10"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </Button>
      </div>

      {/* 3D Canvas */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
          </div>
        }
      >
        <Canvas
          ref={canvasRef}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <Environment preset="city" />
          <Grid args={[10, 10]} cellColor="#06b6d4" sectionColor="#0891b2" />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={20}
          />
          <Model3D url={modelUrl} onLoad={() => setIsLoading(false)} />
        </Canvas>
      </Suspense>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-20">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
        </div>
      )}
    </div>
  );
}

