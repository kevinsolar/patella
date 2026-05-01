import type { ReactNode } from "react"
import {
	ArrowRight,
	BadgeCheck,
	BarChart3,
	Mail,
	MapPin,
	MessageCircle,
	SearchCheck,
	Sparkles,
	Target,
} from "lucide-react"
import Image from "next/image"
import { ButtonLink } from "@/components/ui/button-link"
import { Card } from "@/components/ui/card"
import {
	about,
	clients,
	contact,
	consultingProgram,
	credibilityItems,
	expertise,
	pillars,
	services,
} from "@/content/site-content"
import { getExternalLinkProps } from "@/lib/link-props"
import { HeroSection } from "./hero-section"
import { SiteHeader } from "./site-header"

const credibilityIcons = [SearchCheck, Target, BarChart3, Sparkles]
const accentColorClasses = [
	"bg-brand",
	"bg-accent-purple",
	"bg-accent-green",
	"bg-accent-orange",
]
const clientLogos = [
	{ name: "Homenz", src: "/01-logo-homenz.webp" },
	{ name: "Select Capilar", src: "/01-logo-select.webp" },
	{ name: "BTA Creative", src: "/bta-creative-logo.webp" },
	{ name: "Odonto Data", src: "/odonto-data.webp" },
	{ name: "Oral Unic", src: "/logo-oralunic.webp" },
	{ name: "Trade Up", src: "/trade-up.webp" },
	{ name: "300 Ecossistema de Alto Impacto", src: "/logo-300.webp" },
] as const

export function HomePage() {
	return (
		<>
			<SiteHeader />
			<main>
				<HeroSection />
				<CredibilityStrip />
				<AboutSection />
				<ConsultingProgramSection />
				<ServicesSection />
				<ExpertiseSection />
				<ClientsSection />
				<FinalCtaSection />
				<ContactSection />
			</main>
		</>
	)
}

function CredibilityStrip() {
	return (
		<section className="border-y border-line" aria-label="Destaques">
			<div className="section-shell grid md:grid-cols-4">
				{credibilityItems.map((item, index) => {
					const Icon = credibilityIcons[index]
					return (
						<div
							className="border-b border-line py-6 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
							key={item.title}
						>
							<Icon className="mb-4 text-brand" aria-hidden />
							<h2 className="text-lg font-semibold text-ink">
								{item.title}
							</h2>
							<p className="mt-2 text-sm leading-6 text-muted-copy">
								{item.description}
							</p>
						</div>
					)
				})}
			</div>
		</section>
	)
}

function AboutSection() {
	return (
		<section className="section-shell scroll-mt-24 py-20" id="quem-somos">
			<div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
				<div>
					<p className="uppercase-label">{about.label}</p>
					<h2 className="mt-4 text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
						{about.title}
					</h2>
				</div>
				<div>
					<p className="text-lg leading-8 text-copy">{about.body}</p>
					<div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
						<div className="grid gap-3">
							{pillars.map((pillar) => (
								<Card className="p-4" key={pillar}>
									<BadgeCheck className="mb-3 text-brand" aria-hidden />
									<p className="text-sm font-semibold text-ink">
										{pillar}
									</p>
								</Card>
							))}
						</div>
						<div className="relative min-h-64 overflow-hidden rounded-[6px] border border-line">
							<Image
								alt="Fachada da Patella Marketing Ads Intelligence"
								className="object-cover"
								fill
								sizes="(min-width: 1024px) 420px, 100vw"
								src="/patella-local.webp"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function ConsultingProgramSection() {
	return (
		<section className="relative overflow-hidden bg-ink bg-[linear-gradient(90deg,rgba(8,8,8,0.84)_0%,rgba(8,8,8,0.58)_55%,rgba(8,8,8,0.36)_100%),url('/bg-consulting.webp')] bg-cover bg-center py-20 text-white">
			<div className="section-shell relative z-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
				<div className="rounded-[6px] border border-white/15 bg-white/10 p-6 shadow-cascade backdrop-blur">
					<p className="uppercase-label">{consultingProgram.label}</p>
					<h2 className="mt-4 text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
						{consultingProgram.title}
					</h2>
					<p className="mt-6 text-lg leading-8 text-white/75">
						{consultingProgram.body}
					</p>
				</div>

				<div className="grid gap-4">
					{consultingProgram.steps.map((step, index) => (
						<div
							className="flex items-center gap-4 rounded-[6px] border border-white/15 bg-white p-5 text-ink"
							key={step}
						>
							<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
								{String(index + 1).padStart(2, "0")}
							</span>
							<h3 className="text-xl font-semibold text-ink">{step}</h3>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function ServicesSection() {
	return (
		<section className="section-shell scroll-mt-24 py-20" id="servicos">
			<p className="uppercase-label">Servicos</p>
			<div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
				<h2 className="text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
					Servicos
				</h2>
				<p className="max-w-xl text-base leading-7 text-muted-copy">
					Tres frentes conectadas para planejar, executar e medir crescimento.
				</p>
			</div>
			<div className="mt-10 grid gap-4 md:grid-cols-3">
				{services.map((service) => (
					<Card className="p-6" key={service.title}>
						<h3 className="text-2xl font-semibold text-ink">
							{service.title}
						</h3>
						<p className="mt-4 min-h-28 text-base leading-7 text-muted-copy">
							{service.description}
						</p>
						<ButtonLink
							className="mt-6"
							href={contact.whatsappHref}
							variant="secondary"
						>
							Solicitar orcamento
							<ArrowRight aria-hidden size={18} />
						</ButtonLink>
					</Card>
				))}
			</div>
		</section>
	)
}

function ExpertiseSection() {
	return (
		<section className="border-y border-line py-20" id="expertises">
			<div className="section-shell">
				<p className="uppercase-label">Expertises</p>
				<h2 className="mt-4 text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
					Nossas expertises
				</h2>
				<div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{expertise.map((item, index) => (
						<div
							className="rounded-lg border border-line px-4 py-5 text-sm font-semibold text-ink"
							key={item}
						>
							<span
								className={`mb-4 block h-1 w-12 rounded-md ${accentColorClasses[index % accentColorClasses.length]}`}
							/>
							{item}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function ClientsSection() {
	return (
		<section className="section-shell scroll-mt-24 py-20" id="clientes">
			<div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
				<div>
					<p className="uppercase-label">Clientes</p>
					<h2 className="mt-4 text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
						Clientes
					</h2>
				</div>
				<div>
					<p className="max-w-xl text-base leading-7 text-muted-copy">
						Operacoes atendidas pela Patella em marketing, dados e performance.
					</p>
					<div className="mt-6 flex flex-wrap justify-start gap-3 sm:justify-center">
						{clientLogos.map((client) => (
							<Card
								className="relative flex min-h-28 w-full min-w-0 items-center justify-center p-5 sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)]"
								key={client.name}
							>
								<Image
									alt={client.name}
									className="object-contain p-4"
									fill
									sizes="(min-width: 1024px) 220px, (min-width: 640px) 50vw, 100vw"
									src={client.src}
								/>
							</Card>
						))}
					</div>
					<div className="mt-6 flex flex-wrap justify-center gap-2">
						{clients.map((client) => (
							<span
								className="rounded-lg border border-line px-3 py-2 text-xs font-semibold uppercase tracking-[1px] text-muted-copy"
								key={client}
							>
								{client}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

function FinalCtaSection() {
	return (
		<section className="bg-ink py-20 text-white">
			<div className="section-shell flex flex-col justify-between gap-8 md:flex-row md:items-center">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[1.5px] text-brand-400">
						Proximo passo
					</p>
					<h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
						Vamos transformar campanhas em crescimento mensuravel.
					</h2>
				</div>
				<ButtonLink href={contact.whatsappHref}>
					Falar com especialista
				</ButtonLink>
			</div>
		</section>
	)
}

function ContactSection() {
	return (
		<footer className="section-shell scroll-mt-24 py-16" id="contato">
			<div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
				<div>
					<p className="uppercase-label">Contato</p>
					<h2 className="mt-4 text-4xl font-semibold text-ink">
						Contato
					</h2>
					<p className="mt-4 text-base leading-7 text-muted-copy">
						Entre em contato e solicite um orcamento ou tire suas duvidas.
					</p>
				</div>
				<div className="grid gap-4">
					<ContactLine
						href={contact.mapsHref}
						icon={<MapPin aria-hidden />}
						label={contact.address}
					/>
					<ContactLine
						href={contact.whatsappHref}
						icon={<MessageCircle aria-hidden />}
						label={contact.phone}
					/>
					<ContactLine
						href={contact.mailHref}
						icon={<Mail aria-hidden />}
						label={contact.email}
					/>
				</div>
			</div>
			<div className="mt-12 border-t border-line pt-6 text-sm text-muted-copy">
				Todos os direitos reservados (c) PATELLA BUSINESS INTELLIGENCE.
			</div>
		</footer>
	)
}

function ContactLine({
	href,
	icon,
	label,
}: {
	href?: string
	icon: ReactNode
	label: string
}) {
	const className =
		"flex items-start gap-4 rounded-lg border border-line p-4 text-base font-medium text-ink"

	if (href) {
		return (
			<a
				className={`${className} link-shift`}
				href={href}
				{...getExternalLinkProps({ href })}
			>
				<span className="text-brand">{icon}</span>
				<span>{label}</span>
			</a>
		)
	}

	return (
		<div className={className}>
			<span className="text-brand">{icon}</span>
			<span>{label}</span>
		</div>
	)
}
