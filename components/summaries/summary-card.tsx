import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SummaryProps } from "@/types/summary-type";
import { Badge } from "../ui/badge";
import { SummaryDelete } from "./summary-deleteBtn";
import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const SummaryCard = ({ summary }: { summary: SummaryProps }) => {
  return (
    <Card className="p-4 transition-transform duration-200 hover:scale-105 cursor-pointer h-56">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <FileText size={28} className="text-red-400" />
            {summary.title}{" "}
          </div>
        </CardTitle>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(summary.createdAt), {
            addSuffix: true,
          })}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-full">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 overflow-hidden">
          {summary.summaryText}
        </p>
        <div className="flex justify-between items-center">
          <Badge className="bg-green-200 text-green-600">
            {summary.status}
          </Badge>
          <SummaryDelete />
        </div>
      </CardContent>
    </Card>
  );
};
