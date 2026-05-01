import { describe, expect, it } from "vitest";

import {
  contact,
  expertise,
  hero,
  navItems,
  services,
  stats,
} from "./site-content";

describe("site content", () => {
  it("keeps the approved Patella positioning and proof points", () => {
    expect(hero.headline).toBe(
      "Marketing Ads Intelligence para crescimento mensuravel",
    );
    expect(hero.kicker).toContain("Google Partner");
    expect(stats.map((stat) => stat.value)).toEqual(["14+", "19+", "2005"]);
  });

  it("exposes one-page anchor navigation", () => {
    expect(navItems).toEqual([
      { label: "Home", href: "#home" },
      { label: "Quem Somos", href: "#quem-somos" },
      { label: "Servicos", href: "#servicos" },
      { label: "Expertises", href: "#expertises" },
      { label: "Clientes", href: "#clientes" },
      { label: "Contato", href: "#contato" },
    ]);
  });

  it("keeps public contact channels from the source site", () => {
    expect(contact.phone).toBe("(11) 97496-2232");
    expect(contact.email).toBe("contato@patella.com.br");
    expect(contact.whatsappHref).toBe(
      "https://api.whatsapp.com/send?phone=5511974962232",
    );
    expect(contact.mailHref).toBe("mailto:contato@patella.com.br");
    expect(contact.address).toContain("Mogi das Cruzes");
  });

  it("defines services and expertise used by the landing page", () => {
    expect(services.map((service) => service.title)).toEqual([
      "Google",
      "Gestao",
      "Social Media",
    ]);
    expect(expertise).toContain("Inteligencia em Metricas");
    expect(expertise).toContain("Franquias");
  });
});
