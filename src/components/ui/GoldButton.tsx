import React from 'react';
import { motion } from 'framer-motion';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs tracking-wider',
    md: 'px-6 py-3 text-sm tracking-widest',
    lg: 'px-8 py-4 text-base tracking-widest',
  }[size];

  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles =
      'bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-emerald-950 font-semibold shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.5)] border border-gold-300/40';
  } else if (variant === 'outline') {
    variantStyles =
      'bg-emerald-900/40 text-gold-300 border border-gold-500/50 hover:border-gold-400 hover:bg-gold-500/10 shadow-[0_2px_12px_rgba(0,0,0,0.3)]';
  } else if (variant === 'glass') {
    variantStyles =
      'bg-white/5 backdrop-blur-md text-gold-200 border border-white/10 hover:border-gold-400/40 hover:bg-white/10';
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full font-serif uppercase transition-all duration-300 cursor-pointer overflow-hidden ${sizeStyles} ${variantStyles} ${className}`}
      {...(props as any)}
    >
      {/* Subtle shine sweep effect on hover */}
      <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
