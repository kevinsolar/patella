"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

type MobileMenuProps = {
	items: ReadonlyArray<{
		label: string
		href: string
	}>
}

export function MobileMenu({ items }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="md:hidden">
			<button
				aria-expanded={isOpen}
				aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
				className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white"
				onClick={() => setIsOpen((current) => !current)}
				type="button"
			>
				{isOpen ? (
					<X aria-hidden size={18} />
				) : (
					<Menu aria-hidden size={18} />
				)}
			</button>

			{isOpen ? (
				<nav
					aria-label="Mobile"
					className="absolute left-0 top-full w-full border-t border-white/10 bg-ink/95 backdrop-blur"
				>
					<div className="section-shell grid gap-3 py-4">
						{items.map((item) => (
							<a
								className="text-sm font-semibold text-white/85 transition-colors hover:text-white"
								href={item.href}
								key={item.href}
								onClick={() => setIsOpen(false)}
							>
								{item.label}
							</a>
						))}
					</div>
				</nav>
			) : null}
		</div>
	)
}
