export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  flex-col md:flex-row ">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-2">{children}</div>
    </div>
  );
}