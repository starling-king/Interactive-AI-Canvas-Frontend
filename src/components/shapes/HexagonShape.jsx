
export default function HexagonShape({ className = "w-full h-full text-slate-800" }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* 6 balanced points mapping a geometric hexagon */}
            <polygon points="50,2 95,27 95,73 50,98 5,73 5,27" fill="currentColor" stroke="currentColor" strokeWidth="2" className="opacity-90" />
        </svg>
    );
}