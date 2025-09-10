/*
 * COMPONENTE LOGO TEMPORAL - SISTEMA BOMBEROS
 * ==========================================
 * 
 * Logo temporal para resolver problemas de carga
 * mientras se corrigen las dependencias de assets
 */

import React from 'react';
import { Flame } from 'lucide-react';

interface TemporaryLogoProps {
  className?: string;
  size?: number;
}

export function TemporaryLogo({ className = "", size = 40 }: TemporaryLogoProps) {
  return (
    <div 
      className={`bg-primary rounded-full flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Flame className="text-primary-foreground" style={{ width: size * 0.6, height: size * 0.6 }} />
    </div>
  );
}