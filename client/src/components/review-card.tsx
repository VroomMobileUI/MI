import { Star } from "lucide-react";
import type { Review } from "@shared/schema";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-[var(--cinema-black)] rounded-xl p-6 card-hover">
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              size={16}
              className={i < review.rating ? "fill-current" : ""}
            />
          ))}
        </div>
        <span className="ml-2 text-[var(--cinema-text)] text-sm">
          {formatDate(review.date)}
        </span>
      </div>
      
      <h4 className="font-bold mb-2 text-white">{review.title}</h4>
      <p className="text-[var(--cinema-text)] mb-4 line-clamp-3">{review.content}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">{review.customerName}</span>
        <span className="text-xs text-[var(--cinema-text)]">Product Review</span>
      </div>
    </div>
  );
}
