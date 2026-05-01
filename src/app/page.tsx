import { HomePage } from "@/components/home/home-page"

export const dynamic = "force-static"
export const revalidate = 86_400

export default function Page() {
	return <HomePage />
}
