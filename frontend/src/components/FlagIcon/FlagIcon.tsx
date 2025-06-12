import type { FC, SVGProps } from 'react';

import SpanishFlag from './assets/spain.svg?react';
import BritishFlag from './assets/united-kingdom.svg?react';
import DutchFlag from './assets/netherlands.svg?react';
import AustralianFlag from './assets/australia.svg?react';
import BrazilianFlag from './assets/brazil.svg?react';
import ColombianFlag from './assets/colombia.svg?react';
import FinnishFlag from './assets/finland.svg?react';
import FrenchFlag from './assets/france.svg?react';
import GermanFlag from './assets/germany.svg?react';
import ItalianFlag from './assets/italy.svg?react';
import MexicanFlag from './assets/mexico.svg?react';
import MonegasqueFlag from './assets/monaco.svg?react';
import PolishFlag from './assets/poland.svg?react';
import VenezuelanFlag from './assets/venezuela.svg?react';
import Placeholder from './assets/placeholder.svg?react';

type SVGComponent = FC<SVGProps<SVGSVGElement>>;

type Nationality =
  | 'spanish'
  | 'british'
  | 'dutch'
  | 'australian'
  | 'brazilian'
  | 'colombian'
  | 'finnish'
  | 'french'
  | 'german'
  | 'italian'
  | 'mexican'
  | 'monegasque'
  | 'polish'
  | 'venezuelan';

const NATIONALITIES: Record<Nationality, SVGComponent> = {
  spanish: SpanishFlag,
  british: BritishFlag,
  dutch: DutchFlag,
  australian: AustralianFlag,
  brazilian: BrazilianFlag,
  colombian: ColombianFlag,
  finnish: FinnishFlag,
  french: FrenchFlag,
  german: GermanFlag,
  italian: ItalianFlag,
  mexican: MexicanFlag,
  monegasque: MonegasqueFlag,
  polish: PolishFlag,
  venezuelan: VenezuelanFlag,
};

type Props = {
  nationality: string;
};

export const FlagIcon = ({ nationality }: Props) => {
  const normalized = nationality.trim().toLowerCase();
  const Icon = (NATIONALITIES as Record<string, SVGComponent>)[normalized] ?? Placeholder;

  if (!NATIONALITIES[normalized as Nationality]) {
    console.warn(`Unknown nationality: "${nationality}"`);
  }

  return (
    <div className="shrink-0 mr-2">
      <Icon
        className="w-9 h-9 rounded-full border-2 border-white shadow-sm box-content"
        aria-label={`${nationality} flag`}
        focusable="false"
      />
    </div>
  );
};
