import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitPrayerRequest } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "../components/PageHero";

const prayerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  request: z.string().min(10, "Please share more about your prayer request"),
  isPrivate: z.boolean().default(false),
});

export default function Prayer() {
  const { toast } = useToast();
  const submitPrayer = useSubmitPrayerRequest();

  const form = useForm<z.infer<typeof prayerSchema>>({
    resolver: zodResolver(prayerSchema),
    defaultValues: {
      name: "",
      email: "",
      request: "",
      isPrivate: false,
    },
  });

  function onSubmit(values: z.infer<typeof prayerSchema>) {
    submitPrayer.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Prayer Request Received",
            description: "Our team will be praying with you.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to submit prayer request. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        align="center"
        eyebrow="Prayer"
        title={<>We Believe in <span className="text-afm-red">The Power of Prayer</span></>}
        description="Whatever you're facing, you don't have to face it alone. Share your request below, and our pastoral team will pray over it."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 md:p-12"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase">Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase">Email (Optional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="request"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs tracking-widest uppercase">How can we pray for you?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your heart..." 
                        className="min-h-[150px] resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-border bg-background/50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded-md data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">
                        Keep this private
                      </FormLabel>
                      <p className="text-xs text-muted-foreground font-light">
                        Only the pastoral team will see this request. It will not be shared with the broader prayer team.
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-14 uppercase tracking-widest text-sm font-medium"
                disabled={submitPrayer.isPending}
              >
                {submitPrayer.isPending ? "Submitting..." : "Submit Prayer Request"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
