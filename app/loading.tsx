export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-navy-950">
            <div className="relative h-16 w-16">
                <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400 opacity-20 duration-1000"></div>
                <div className="absolute inset-2 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500 dark:border-navy-700 dark:border-t-cyan-400"></div>
                <div className="absolute inset-4 animate-pulse rounded-full bg-violet-500/20"></div>
            </div>
        </div>
    );
}
