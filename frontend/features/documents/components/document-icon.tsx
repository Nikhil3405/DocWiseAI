import {
  Award,
  BadgeCheck,
  FileText,
  GraduationCap,
  IdCard,
  ReceiptText,
} from "lucide-react";

type Props = {
  type?: string | null;
};

export function DocumentIcon({
  type,
}: Props) {
  const value = type?.toLowerCase() ?? "";

  if (value.includes("aadhaar"))
    return <IdCard className="size-6" />;

  if (value.includes("pan"))
    return <BadgeCheck className="size-6" />;

  if (value.includes("passport"))
    return <IdCard className="size-6" />;

  if (value.includes("certificate"))
    return <Award className="size-6" />;

  if (value.includes("resume"))
    return <FileText className="size-6" />;

  if (value.includes("invoice"))
    return <ReceiptText className="size-6" />;

  return <GraduationCap className="size-6" />;
}