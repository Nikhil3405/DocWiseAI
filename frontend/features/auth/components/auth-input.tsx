import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthInputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
};

export function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
      </Label>

      <Input
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}