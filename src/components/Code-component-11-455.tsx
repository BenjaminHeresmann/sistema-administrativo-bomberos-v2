import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from './ui/button';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  onNavigate?: (page: string) => void;
}

export function BreadcrumbNavigation({ items, onNavigate }: BreadcrumbNavigationProps) {
  return (
    <nav aria-label="Navegación de rutas" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {/* Inicio siempre presente */}
        <li>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1 text-muted-foreground hover:text-foreground"
            onClick={() => onNavigate?.('dashboard')}
            aria-label="Ir al dashboard principal"
          >
            <Home className="w-4 h-4" />
          </Button>
        </li>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </li>
            <li>
              {item.current ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-muted-foreground hover:text-foreground"
                  onClick={item.onClick}
                  aria-label={`Ir a ${item.label}`}
                >
                  {item.label}
                </Button>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}