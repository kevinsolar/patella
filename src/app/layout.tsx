import type { Metadata } from "next"
import "./globals.css"
import { Inter, Syne } from "next/font/google"
import { cn } from "@/lib/utils"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
})

const syne = Syne({
	subsets: ["latin"],
	variable: "--font-syne",
	display: "swap",
})

export const metadata: Metadata = {
	metadataBase: new URL("https://patella.com.br"),
	title: "Patella Marketing Ads Intelligence",
	description:
		"Consultoria em Google Ads, marketing intelligence, metricas e crescimento mensuravel para empresas, agencias e franquias.",
	openGraph: {
		title: "Patella Marketing Ads Intelligence",
		description: "Marketing Ads Intelligence para crescimento mensuravel.",
		url: "https://patella.com.br",
		locale: "pt_BR",
		images: [
			{
				url: "/octa-image.webp",
				width: 351,
				height: 348,
				alt: "Patella Marketing Ads Intelligence",
			},
		],
		siteName: "Patella",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Patella Marketing Ads Intelligence",
		description: "Marketing Ads Intelligence para crescimento mensuravel.",
		images: ["/octa-image.webp"],
	},
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="pt-BR"
			className={cn("font-sans", inter.variable, syne.variable)}
		>
			<body>{children}</body>
		</html>
	)
}
