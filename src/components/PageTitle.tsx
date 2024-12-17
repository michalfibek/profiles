export default function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl my-8 font-bold tracking-tight sm:text-4xl">{children}</h1>;
}
