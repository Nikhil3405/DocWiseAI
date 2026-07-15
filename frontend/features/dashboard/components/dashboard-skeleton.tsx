import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Skeleton className="h-36 w-full rounded-3xl" />

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left Column */}
        <div className="space-y-8 lg:col-span-2">
          {/* Quick Actions */}
          <div className="rounded-2xl border p-6">
            <Skeleton className="mb-6 h-7 w-40" />

            <div className="flex gap-3">
              <Skeleton className="h-11 w-40 rounded-xl" />
              <Skeleton className="h-11 w-32 rounded-xl" />
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border p-5"
              >
                <Skeleton className="mb-4 h-10 w-10 rounded-xl" />
                <Skeleton className="mb-2 h-8 w-14" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>

          {/* Recent Documents */}
          <div className="rounded-2xl border p-6">
            <Skeleton className="mb-2 h-7 w-44" />
            <Skeleton className="mb-6 h-4 w-40" />

            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-xl border p-4"
                >
                  <Skeleton className="h-12 w-12 rounded-xl" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-44" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-6 w-32 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workspace Assistant */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border p-6">
            <Skeleton className="mb-6 h-8 w-52" />

            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`flex ${
                    index % 2 === 0
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <Skeleton
                    className={`h-20 rounded-2xl ${
                      index % 2 === 0
                        ? "w-64"
                        : "w-80"
                    }`}
                  />
                </div>
              ))}

              <Skeleton className="mt-8 h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}