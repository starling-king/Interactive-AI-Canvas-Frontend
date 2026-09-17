
export default function ParallelogramShape({ className = "w-full h-full text-slate-800" }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* Slanted lines giving the kinetic forward motion look */}
            <polygon points="20,2 98,2 80,98 2,98" fill="currentColor" stroke="currentColor" strokeWidth="2" className="opacity-90" />
        </svg>
    );
}