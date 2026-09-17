
export default function CylinderShape({ className = "w-full h-full text-slate-800" }) {
    return (
        <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none" 
            className={className}
        >
            {/* Body and bottom curved base */}
            <path 
                d="M 2 20 L 2 80 A 48 18 0 0 0 98 80 L 98 20 Z" 
                fill="currentColor" 
                stroke="#e2e8f0" 
                strokeWidth="2" 
                className="opacity-90"
            />
            {/* Top rim cap */}
            <ellipse 
                cx="50" 
                cy="20" 
                rx="48" 
                ry="18" 
                fill="currentColor" 
                stroke="#e2e8f0" 
                strokeWidth="2" 
            />
        </svg>
    );
}