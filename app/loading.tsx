export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-[#020617] flex items-center justify-center">
            <div className="relative flex flex-col items-center">
                {/* Logo Loader */}
                <div className="w-24 h-24 relative mb-8">
                    <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-full animate-pulse"></div>
                </div>

                {/* Text */}
                <h1 className="text-2xl font-bold text-white tracking-widest animate-pulse">
                    COMPU<span className="text-cyan-400">PLUS</span>
                </h1>
                <div className="mt-2 text-xs text-slate-500 font-mono tracking-[0.3em] uppercase">
                    Initializing System...
                </div>
            </div>
        </div>
    );
}
