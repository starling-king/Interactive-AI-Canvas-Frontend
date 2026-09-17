
export default function DiamondShape({ className = "w-full h-full text-slate-800" }) {
    return (
        <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none" 
            className={className}
        >
            <polygon 
                points="50,2 98,50 50,98 2,50" 
                fill="currentColor" 
                stroke="#e2e8f0" 
                strokeWidth="2" 
                strokeLinejoin="round"
                className="opacity-90"
            />
        </svg>
    );
}