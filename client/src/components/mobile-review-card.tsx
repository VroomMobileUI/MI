import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Review } from "@shared/schema";

interface MobileReviewCardProps {
  review: Review;
}

export default function MobileReviewCard({ review }: MobileReviewCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -1 }}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
    >
      <div className="flex items-center space-x-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            size={14}
            className={`${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      
      <h4 className="font-bold text-sm mb-2 text-black">{review.title}</h4>
      <p className="text-gray-700 text-sm mb-3 line-clamp-3 leading-relaxed">{review.content}</p>
      
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-black">{review.customerName}</span>
        <span className="text-gray-500">{formatDate(review.date)}</span>
      </div>
    </motion.div>
  );
}