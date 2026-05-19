import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <p className="text-muted-foreground text-sm">
          &copy; 2026 WI.UI &mdash; 2V Educação
        </p>

        <nav className="flex items-center gap-4">
          <a
            href="https://github.com/guisilva10/wi-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Docs
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export { Footer };
