import Link from "next/link";

import { Logo } from "@/components/layout/logo";


export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className=" px-6 py-10">
        <div className="flex flex-row gap-10 md:items-start md:justify-between">
          {/* Brand */}
            <Logo />

          <p className="text-center">© {new Date().getFullYear()} DocWiseAI. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}