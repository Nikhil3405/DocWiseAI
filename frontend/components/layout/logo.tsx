import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  showText?: boolean;
};

export function Logo({
  showText = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <Image
        src="/logo2.svg"
        alt="DocWiseAI Logo"
        width={60}
        height={60}
        className="rounded-xl object-contain"
        priority
      />

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-semibold tracking-tight">
            DocWiseAI
          </span>

        </div>
      )}
    </Link>
  );
}