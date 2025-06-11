import type { FC, SVGProps } from 'react';

import { ReactComponent as SpanishFlag } from './assets/spain.svg';
import { ReactComponent as BritishFlag } from './assets/united-kingdom.svg';
import { ReactComponent as DutchFlag } from './assets/netherlands.svg';
import { ReactComponent as AustralianFlag } from './assets/australia.svg';
import { ReactComponent as BrazilianFlag } from './assets/brazil.svg';
import { ReactComponent as ColombianFlag } from './assets/colombia.svg';
import { ReactComponent as FinnishFlag } from './assets/finland.svg';
import { ReactComponent as FrenchFlag } from './assets/france.svg';
import { ReactComponent as GermanFlag } from './assets/germany.svg';
import { ReactComponent as ItalianFlag } from './assets/italy.svg';
import { ReactComponent as MexicanFlag } from './assets/mexico.svg';
import { ReactComponent as MonegasqueFlag } from './assets/monaco.svg';
import { ReactComponent as PolishFlag } from './assets/poland.svg';
import { ReactComponent as VenezuelanFlag } from './assets/venezuela.svg';
import { ReactComponent as Placeholder } from './assets/placeholder.svg';

type SVGComponent = FC<SVGProps<SVGSVGElement>>;

const NATIONALITIES: Record<string, SVGComponent> = {
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
  readonly nationality: string;
};

export const FlagIcon = ({ nationality }: Props) => {
  const Icon = NATIONALITIES[nationality.toLowerCase()] ?? Placeholder;

  const ariaLabel = `${nationality} flag icon. The driver is ${nationality}.`;

  return (
    <div className="shrink-0 mr-2">
      <Icon
        className="w-9 h-9 rounded-full border-2 border-white shadow-sm box-content"
        aria-label={ariaLabel}
        focusable="false"
      />
    </div>
  );
};
