export default function FeatureCard({
    icon,
    title,
    children,
}) {
    return (
        <article className="group relative overflow-hidden rounded-panel border border-navy-950/10 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-penguins-500/30 hover:shadow-card sm:p-8">
            <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-penguins-100/70 blur-2xl transition duration-300 group-hover:bg-penguins-200/70"
            />

            <div className="relative">
                <div className="icon-badge">
                    {icon}
                </div>

                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-navy-950">
                    {title}
                </h3>

                <p className="mt-4 text-base leading-7 text-slate">
                    {children}
                </p>
            </div>
        </article>
    );
}
