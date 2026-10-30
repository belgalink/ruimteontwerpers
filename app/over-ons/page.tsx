import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "ORO is een ontwerp- en studiebureau uit Gent, opgericht door landschapsarchitect en stedenbouwkundige Thomas Janssens.",
};

const OPDRACHTGEVERS = [
  "Particulieren",
  "Kantoren en bedrijven",
  "Ziekenhuizen, woon- en zorgcentra",
  "Projectontwikkelaars",
  "Architecten en studiebureaus",
  "Steden en gemeenten",
  "De Vlaamse Gemeenschap",
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="main-content">
        <div className="page-text">
          <header>
            <h1>
              ORO is een ontwerp- en studiebureau uit Gent.
              <br />
              Wij ontwerpen open ruimte op elke schaal, van stadstuin tot
              landschap.
            </h1>
          </header>

          <div className="text-content">
            <section>
              <h2>Studio</h2>
              <p>
                ORO — open ruimte ontwerpers — is een ontwerp- en studiebureau
                uit Gent, opgericht door Thomas Janssens, landschapsarchitect en
                stedenbouwkundige. Hij werkt samen met een team van
                tuinarchitecten, landschapsarchitecten en stedenbouwkundigen.
              </p>
              <p>
                Het bureau ontwerpt en coördineert groene buitenruimte in de
                breedste zin: van daktuinen en groengevels tot parken, pleinen,
                landschappen en grootschalige infrastructuur. Daarnaast maakt
                ORO landschapsstudies, masterplannen, beeldkwaliteitsplannen en
                stedenbouwkundige visies voor de herinrichting van woonwijken en
                semipublieke gebouwen.
              </p>
              <p>
                Projecten als het Lievepark in Gent, de educatieve duinentuin van
                Bezoekerscentrum De Duinpanne in De Panne, het Eilandbos in
                Sint-Lievens-Houtem en het Herman Pillaertpark in Gent tonen hoe
                het bureau werkt rond erfgoed, natuurinrichting, publieke ruimte
                en het dagelijkse gebruik van open ruimte.
              </p>
            </section>

            <section>
              <h2>Visie</h2>
              <p>
                Landschapsarchitectuur gaat over de manier waarop we met ruimte
                omgaan. Elk ontwerp vertrekt vanuit de relatie tussen een plek,
                haar omgeving en de gelaagdheid van het landschap errond. Die
                synergie tussen ruimte en landschap is het uitgangspunt.
              </p>
              <p>
                Ontwerpen is een dynamisch en gezamenlijk proces. Het begint bij
                een blijvende dialoog met de opdrachtgever. Via schetsen,
                3D-studies en collages groeit het ontwerp naar een
                uitvoeringsplan in 2D, dat tijdens de werf verder wordt
                bijgestuurd.
              </p>
              <p>
                Planten zijn klein bij aanplant en groeien pas met de jaren. Wij
                planten daarom dicht, zodat de bodem meteen bedekt is. Daarna
                gaan de soorten met elkaar de concurrentie aan en verdringen de
                snelle groeiers de vulplanten van het eerste uur.
              </p>
              <p>
                Beplanting blijft op lange termijn in beweging. De natuur streeft
                naar een dominante climaxvegetatie, en dat is niet altijd
                wenselijk. De kunst is planten zo te combineren dat ook de
                mooiste soorten het halen op plekken waar sterkere soorten het
                anders zouden overnemen. Tuinarchitectuur is oorlog tussen
                planten — gestuurd door de ontwerper, de opdrachtgever en de
                tuinier.
              </p>
            </section>

            <section>
              <h2>Opdrachtgevers</h2>
              <ul className="section-list">
                {OPDRACHTGEVERS.map((item) => (
                  <li key={item}>
                    <span className="value">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Disciplines</h2>
              <ul className="section-list">
                <li>
                  <span className="label">Ontwerp</span>
                  <span className="value">
                    Parken, pleinen, speelzones, schoolomgevingen, privétuinen,
                    dak- en binnentuinen
                  </span>
                </li>
                <li>
                  <span className="label">Studie</span>
                  <span className="value">
                    Landschapsstudies, masterplannen, beeldkwaliteitsplannen,
                    stedenbouwkundige visies
                  </span>
                </li>
                <li>
                  <span className="label">Beheer</span>
                  <span className="value">
                    Natuurbeheerplannen en erfgoedbeheerplannen
                  </span>
                </li>
                <li>
                  <span className="label">Uitvoering</span>
                  <span className="value">
                    Technische uitwerking, beplantingsplannen, werfopvolging
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
