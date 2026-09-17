
export default function RectangleShape({ className = "w-full h-full text-slate-800" }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            <rect 
                x="2" 
                y="2" 
                width="96" 
                height="96" 
                rx="12" 
                ry="12" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="opacity-90"
            />
        </svg>
    );
}