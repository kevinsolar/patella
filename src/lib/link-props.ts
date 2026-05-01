import type { ComponentProps } from "react"

type AnchorLinkProps = Pick<ComponentProps<"a">, "href" | "rel" | "target">

export function isExternalHref(href: AnchorLinkProps["href"]) {
	if (!href) {
		return false
	}

	return !href.startsWith("#") && !href.startsWith("/") && !href.startsWith("?")
}

export function getExternalLinkProps({ href, rel, target }: AnchorLinkProps) {
	if (!isExternalHref(href)) {
		return { rel, target }
	}

	return {
		rel: rel ? `${rel} noopener noreferrer` : "noopener noreferrer",
		target: target ?? "_blank",
	}
}
