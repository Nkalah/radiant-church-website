import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { PageHero } from "../components/PageHero";

export default function NotFound() {
  return (
    <div className="site-page min-h-screen w-full bg-background">
      <PageHero title="404 Page Not Found" />
      <div className="flex justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardContent className="flex items-start gap-3 pt-6">
            <AlertCircle className="h-7 w-7 shrink-0 text-afm-red" aria-hidden="true" />
            <p className="mt-1 text-sm text-muted-foreground">
            Did you forget to add the page to the router?
            </p>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
