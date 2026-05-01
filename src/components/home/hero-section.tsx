import { ArrowRight, BarChart3, LineChart, Target } from "lucide-react"
import Image from "next/image"
import { ButtonLink } from "@/components/ui/button-link"
import { Card } from "@/components/ui/card"
import { contact, hero, stats } from "@/content/site-content"

export function HeroSection() {
	return (
		<section className="relative scroll-mt-24 overflow-hidden bg-ink" id="home">
			<Image
				alt="Banner"
				aria-hidden
				className="object-cover opacity-[0.5]"
				fetchPriority="high"
				fill
				preload
				quality={72}
				sizes="100vw"
				src="/banner-home.webp"
			/>
			<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.78)_0%,rgba(8,8,8,0.74)_48%,rgba(8,8,8,0.80)_100%)]" />
			<div className="section-shell relative z-10 grid min-h-[calc(100vh-64px)] items-center gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr]">
				<div>
					<p className="uppercase-label mb-4 text-brand-400">{hero.kicker}</p>
					<h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] text-white md:text-7xl lg:text-[80px]">
						{hero.headline}
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
						{hero.body}
					</p>
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<ButtonLink href={contact.whatsappHref}>
							{hero.primaryCta}
						</ButtonLink>
						<ButtonLink
							className="border border-white/20 text-white hover:border-white/50 hover:text-white"
							href="#servicos"
							variant="ghost"
						>
							{hero.secondaryCta}
							<ArrowRight aria-hidden size={18} />
						</ButtonLink>
					</div>
				</div>

				<Card className="border-white/15 bg-white/95 p-4 shadow-cascade md:p-5">
					<div className="mb-4 grid grid-cols-3 gap-3">
						{stats.map((stat) => (
							<div
								className="rounded-[4px] border border-line p-4"
								key={stat.label}
							>
								<strong className="block text-2xl font-semibold text-ink">
									{stat.value}
								</strong>
								<span className="mt-1 block text-xs leading-5 text-muted-copy">
									{stat.label}
								</span>
							</div>
						))}
					</div>

					<div className="rounded-[4px] border border-line p-4">
						<div className="mb-5 flex items-center justify-between gap-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[1px] text-muted-copy">
									Intelligence dashboard
								</p>
								<p className="mt-1 text-sm text-copy">
									campanhas, metas e crescimento
								</p>
							</div>
							<LineChart
								className="shrink-0 text-brand"
								aria-hidden
								size={28}
							/>
						</div>

						<div className="grid gap-3">
							{[
								["Planejamento", "bg-brand", "w-[88%]"],
								["Metricas", "bg-accent-purple", "w-[72%]"],
								["Performance", "bg-accent-green", "w-[94%]"],
							].map(([label, color, width]) => (
								<div key={label}>
									<div className="mb-1 flex items-center justify-between text-xs text-muted-copy">
										<span>{label}</span>
										<span>ativo</span>
									</div>
									<div className="h-3 rounded-[2px] bg-soft">
										<div className={`h-3 rounded-[2px] ${color} ${width}`} />
									</div>
								</div>
							))}
						</div>

						<div className="mt-5 grid grid-cols-2 gap-3">
							<div className="rounded-[4px] bg-brand/10 p-4 text-ink">
								<Target className="mb-3 text-brand" aria-hidden />
								<p className="text-sm font-semibold">Metas claras</p>
							</div>
							<div className="rounded-[4px] bg-accent-yellow/15 p-4 text-ink">
								<BarChart3 className="mb-3 text-accent-orange" aria-hidden />
								<p className="text-sm font-semibold">Numeros reais</p>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</section>
	)
}
