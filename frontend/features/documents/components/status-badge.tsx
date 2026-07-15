import {
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LoaderCircle, CheckCircle2, XCircle } from "lucide-react";
import { getStatusLabel } from "../utils/document-status";

type Props = {
  status: string;
};

export function DocumentStatusBadge({ status }: Props) {
  switch (status) {
    case "READY":
      return (
        <Badge className="gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Ready
        </Badge>
      );

    case "FAILED":
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          Failed
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary" className="gap-1">
          <LoaderCircle className="h-3 w-3 animate-spin" />
          {getStatusLabel(status)}
        </Badge>
      );
  }
}