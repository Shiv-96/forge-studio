/**
 * src/components/Marquee.jsx
 * Slanted lime band with a scrolling list of disciplines, between the hero and
 * the next section. Purely decorative (aria-hidden): the same words appear as
 * real content elsewhere. The scroll animation stops for reduced-motion users.
 */

const words = ['Strength', 'HIIT', 'Yoga', 'Zumba', 'Personal training', 'Small batches', 'First class free'];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {words.map((w) => (
        <span
          key={w}
          className="flex items-center gap-8 font-display text-2xl uppercase tracking-wide whitespace-nowrap sm:text-3xl"
        >
          {w}
          <span className="block h-3 w-4 -skew-x-12 bg-ink-950" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    // Outer wrapper clips the rotated band horizontally so it never causes sideways page scroll.
    <div aria-hidden="true" className="relative z-10 -my-10 overflow-x-clip py-10">
      <div className="-mx-[5%] -rotate-2 overflow-hidden border-y-2 border-ink-950 bg-volt py-3 text-ink-950">
        {/* Two identical rows side by side; shifting by -50% loops seamlessly. */}
        <div className="flex w-max motion-safe:animate-[marquee_32s_linear_infinite]">
          <Row />
          <Row />
        </div>
      </div>
    </div>
  );
}
