import { getTranslations } from "next-intl/server";
import { reviews } from "@/lib/data";
import { ReviewCard } from "@/components/review-card";
import { ReviewForm } from "@/components/review-form";
import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default async function ReviewsPage() {
  const t = await getTranslations("ReviewsPage");
  const session = await auth();

  return (
    <div className="container py-16 sm:py-24">
      <div className="text-center">
        <h1 className="mb-4 font-headline text-5xl md:text-6xl">{t("title")}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl tracking-wide">{t("leaveReviewTitle")}</CardTitle>
              <CardDescription>{t("leaveReviewSubtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              {session?.user ? (
                <ReviewForm />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-border p-8 text-center">
                    <p className="text-muted-foreground">{t('loginToReview')}</p>
                    <Button asChild>
                        <Link href="/login">
                            <LogIn className="mr-2 h-4 w-4"/>
                            {t('Navigation.login')}
                        </Link>
                    </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
