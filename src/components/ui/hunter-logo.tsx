export function HunterLogo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Asa esquerda — superior */}
      <path
        d="M14 19 C10 16, 6 14, 2 15 C5 16, 8 17, 10 19"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <path
        d="M14 19 C9 17, 4 16, 1 18 C4 18.5, 8 18.5, 10 19"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"
      />
      {/* Asa esquerda — inferior */}
      <path
        d="M14 21 C10 24, 6 26, 2 25 C5 24, 8 23, 10 21"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <path
        d="M14 21 C9 23, 4 24, 1 22 C4 21.5, 8 21.5, 10 21"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"
      />

      {/* Asa direita — superior */}
      <path
        d="M26 19 C30 16, 34 14, 38 15 C35 16, 32 17, 30 19"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <path
        d="M26 19 C31 17, 36 16, 39 18 C36 18.5, 32 18.5, 30 19"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"
      />
      {/* Asa direita — inferior */}
      <path
        d="M26 21 C30 24, 34 26, 38 25 C35 24, 32 23, 30 21"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <path
        d="M26 21 C31 23, 36 24, 39 22 C36 21.5, 32 21.5, 30 21"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"
      />

      {/* Mira — círculo */}
      <circle cx="20" cy="20" r="6.5" stroke="currentColor" strokeWidth="1.5" />

      {/* Mira — linhas cruzadas */}
      <line x1="20" y1="5"  x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="27" x2="20" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5"  y1="20" x2="13" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Ponto central */}
      <circle cx="20" cy="20" r="1.8" fill="currentColor" />
    </svg>
  );
}
