type WelcomeBannerProps = {
  name?: string;
};

export function WelcomeBanner({
  name = "User",
}: WelcomeBannerProps) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight">
        {greeting}, {name} 👋
      </h1>

      <p className="mt-2 text-muted-foreground">
        Here's an overview of your documents.
      </p>
    </div>
  );
}