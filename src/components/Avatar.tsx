export function Avatar({ name, hue = 45, size = 36 }: { name: string; hue?: number; size?: number }) {
  const initial = name?.[0]?.toUpperCase() ?? "?";
  return (
    <div
      className="rounded-full grid place-items-center font-bold text-primary-foreground shrink-0 border border-gold/30"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, oklch(0.75 0.18 ${hue}), oklch(0.55 0.16 ${(hue + 60) % 360}))`,
        fontSize: size * 0.42,
      }}
      aria-hidden
    >
      {initial}
    </div>
  );
}
