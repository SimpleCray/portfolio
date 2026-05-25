import { useReveal } from '../hooks/useReveal';
import { useCounter } from '../hooks/useCounter';

type CardValue = { kind: 'count'; target: number; suffix: string } | { kind: 'text'; text: string };

interface Card {
  idx: string;
  value: CardValue;
  label: string;
  body: string;
}

const CARDS: Card[] = [
  {
    idx: '01',
    value: { kind: 'count', target: 10, suffix: '×' },
    label: 'Shipping Velocity',
    body: 'AI handles scaffolding, refactors, and tests — humans review and steer architecture.',
  },
  {
    idx: '02',
    value: { kind: 'text', text: 'Same sprint' },
    label: 'Prototype to Production',
    body: 'Feature prototypes built and validated within hours, then hardened to production-grade code in the same sprint — no throwaway work.',
  },
  {
    idx: '03',
    value: { kind: 'text', text: 'Zero dead time' },
    label: 'From Concept to Code',
    body: 'AI accelerates the full pipeline — from planning and design system to boilerplate and docs — with no dead time between stages.',
  },
  {
    idx: '04',
    value: { kind: 'text', text: '100% reviewed' },
    label: 'Ensured Quality',
    body: 'AI output passes through multiple quality layers — unit, integration, and e2e tests — before a real developer makes the final call. Same bar as fully human-written code.',
  },
];

function AICard({ card, visible, delay }: { card: Card; visible: boolean; delay: number }) {
  const countTarget = card.value.kind === 'count' ? card.value.target : 0;
  const count = useCounter(countTarget, visible, 3000);

  return (
    <article className={`ai-card reveal d${delay}${visible ? ' visible' : ''}`} data-hover=''>
      <span className='frame-corner tl' />
      <span className='frame-corner br' />
      <div className='ai-card-head'>
        <span className='ai-card-idx'>{card.idx}</span>
        <span className='ai-card-label'>{card.label}</span>
      </div>
      <div className='ai-card-value'>
        {card.value.kind === 'count' ? (
          <>
            <span className='ai-card-num'>{count}</span>
            <span className='ai-card-suffix'>{card.value.suffix}</span>
          </>
        ) : (
          <span className='ai-card-text'>{card.value.text}</span>
        )}
      </div>
      <p className='ai-card-body'>{card.body}</p>
    </article>
  );
}

export default function AIWorkflow() {
  const [ref, visible] = useReveal();

  return (
    <section className='section ai' id='ai' ref={ref as React.RefObject<HTMLElement>}>
      <div className='container'>
        <div className={`ai-head reveal${visible ? ' visible' : ''}`}>
          <div className='eyebrow' style={{ justifyContent: 'center', display: 'inline-flex' }}>
            AI-Augmented Workflow
          </div>
          <h2>
            Ship <span className='accent'>10×</span> faster. Same code quality.
          </h2>
          <div className='ai-underline' />
          <p className='ai-lead'>
            AI removes the toil around engineering judgment — never replaces the judgment itself.
          </p>
        </div>

        <div className='ai-grid'>
          {CARDS.map((c, i) => (
            <AICard key={c.idx} card={c} visible={visible} delay={Math.min(i + 1, 5)} />
          ))}
        </div>
      </div>
    </section>
  );
}
