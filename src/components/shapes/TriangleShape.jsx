
export default function TriangleShape({ className = "w-full h-full text-slate-800" }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* A perfect isosceles triangle anchored at the top center and bottom corners */}
            <polygon points="50,2 98,98 2,98" fill="currentColor" stroke="currentColor" strokeWidth="2" className="opacity-90" />
        </svg>
    );
}