import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { Review } from "@/lib/definitions";
import { Star, MessageSquareQuote } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-secondary fill-secondary" : "text-muted-foreground/50"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="relative overflow-hidden border-2 border-transparent transition-all hover:border-secondary hover:shadow-lg hover:shadow-secondary/20">
      <CardContent className="p-6">
        <MessageSquareQuote className="absolute right-4 top-4 h-16 w-16 text-card-foreground/5" />
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={review.userImage} alt={review.userName} />
            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{review.userName}</p>
            <StarRating rating={review.rating} />
          </div>
        </div>
        <p className="mt-4 text-muted-foreground italic">"{review.comment}"</p>
      </CardContent>
    </Card>
  );
}
