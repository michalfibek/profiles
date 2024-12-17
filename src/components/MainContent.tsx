export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto my-12 mb-4 font-[family-name:var(--font-geist-sans)]">
      <div className="mx-4">{children}</div>
    </main>
  );
}
