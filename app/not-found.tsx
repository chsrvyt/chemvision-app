import Link from "next/link";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <EmptyState
        title="Page Not Found"
        description="The page you are looking for does not exist or has been moved."
        actionLabel="Go Home"
        className="max-w-md"
      />
    </div>
  );
}
