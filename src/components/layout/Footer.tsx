export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Ferdinan Strategy Curator. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
