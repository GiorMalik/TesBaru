import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, UserCircle } from "lucide-react";

type Review = {
    id: string;
    userName: string;
    comment: string;
    rating: number;
    createdAt: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="bg-gray-800/50 border-green-500/20">
      <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
        <UserCircle className="w-10 h-10 text-primary" />
        <div>
          <CardTitle className="text-lg text-white">{review.userName}</CardTitle>
          <StarRating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 italic">"{review.comment}"</p>
      </CardContent>
    </Card>
  );
}
