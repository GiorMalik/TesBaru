import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-center">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          &copy; {currentYear} {t('copy')}
        </p>
      </div>
    </footer>
  );
}
