import { Star } from "lucide-react";
import type { Review } from "@shared/schema";

interface MobileReviewCardProps {
  review: Review;
}

export default function MobileReviewCard({ review }: MobileReviewCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-600">
            {review.customerName.charAt(0)}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-sm">{review.customerName}</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={i < review.rating ? "fill-current" : ""}
                />
              ))}
            </div>
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed">
            {review.comment}
          </p>
          
          <p className="text-xs text-gray-500 mt-2">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}