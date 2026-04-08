export function CompendiumFooter() {
  return (
    <footer className="border-t border-warm-200 bg-warm-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-400">
            Data sourced from the CDC&apos;s Compendium of Evidence-Based
            Interventions and Best Practices for HIV Prevention.
          </p>
          <div className="flex items-center gap-4 text-xs text-warm-400">
            <a
              href="https://kalamos.care"
              className="hover:text-warm-600"
            >
              kalamos.care
            </a>
            <span>
              &copy; {new Date().getFullYear()} Kalamos Care, Inc.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
