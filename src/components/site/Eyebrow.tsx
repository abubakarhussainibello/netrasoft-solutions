export default function Eyebrow({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-3.5 py-1.5 text-[13px] text-[#57575a] shadow-[0_1px_2px_rgba(17,17,17,0.05)]",
        center ? "mx-auto" : "",
      ].join(" ")}
    >
      <span className="inline-block h-2 w-2 rounded-[2px] bg-brand" />
      {children}
    </span>
  );
}
