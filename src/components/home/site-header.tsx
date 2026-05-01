import { ButtonLink } from "@/components/ui/button-link"
import { contact, navItems } from "@/content/site-content"
import { WppIcon } from "../icons/wpp"
import { MobileMenu } from "./mobile-menu"

export function SiteHeader() {
	const links = navItems.filter((item) => item.href !== "#home")

	return (
		<header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
			<div className="section-shell flex min-h-16 items-center justify-between gap-4">
				<a
					href="#home"
					className="flex items-center gap-2 text-base font-black tracking-[0.08em] text-white"
				>
					{/* SVG leve e estatico: nao precisa do otimizador do Next. */}
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/logo.svg"
						alt="Patella"
						width={32}
						height={32}
						className="size-8 invert"
					/>
				</a>

				<nav
					className="hidden items-center gap-6 md:flex"
					aria-label="Principal"
				>
					{links.map((item) => (
						<a
							className="relative pb-1 text-xs font-semibold uppercase tracking-[1.2px] text-white/65 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:text-white hover:after:w-full"
							href={item.href}
							key={item.href}
						>
							{item.label}
						</a>
					))}
				</nav>

				<ButtonLink
					className="hidden min-h-9 px-4 py-2 md:inline-flex hover:bg-green-500"
					href={contact.whatsappHref}
				>
					<WppIcon className="size-6 text-white" />
					WhatsApp
				</ButtonLink>

				<MobileMenu items={links} />
			</div>
		</header>
	)
}
