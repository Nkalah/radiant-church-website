import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
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
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "../components/PageHero";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    submitContact.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Message Sent",
            description: "We'll get back to you as soon as possible.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to send message. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Connect"
        title="Get in Touch"
        description="Whether you have a question about our services, ministries, or simply want to connect, we'd love to hear from you."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-medium tracking-widest uppercase mb-4 text-primary">Location</h3>
                <p className="font-serif text-2xl mb-2">AFM Cathedral</p>
                <p className="text-muted-foreground font-light leading-relaxed">
                  1200 Sanctuary Avenue<br/>
                  Metropolis, NY 10001
                </p>
              </div>

              <div>
                <h3 className="text-xs font-medium tracking-widest uppercase mb-4 text-primary">Service Times</h3>
                <div className="space-y-2">
                  <p className="flex justify-between max-w-xs border-b border-border pb-2">
                    <span className="font-light text-muted-foreground">Sunday Morning</span>
                    <span className="font-mono">9:00 AM & 11:30 AM</span>
                  </p>
                  <p className="flex justify-between max-w-xs border-b border-border pb-2">
                    <span className="font-light text-muted-foreground">Wednesday Night</span>
                    <span className="font-mono">7:00 PM</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium tracking-widest uppercase mb-4 text-primary">Contact Info</h3>
                <p className="text-muted-foreground font-light mb-1">hello@afmchurch.com</p>
                <p className="text-muted-foreground font-light">(555) 123-4567</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-fit rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12"
          >
            <h3 className="text-2xl font-serif mb-8">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase">Name</FormLabel>
                      <FormControl>
                        <Input className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-widest uppercase">Email</FormLabel>
                        <FormControl>
                          <Input type="email" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs tracking-widest uppercase">Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase">Subject (Optional)</FormLabel>
                      <FormControl>
                        <Input className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-14 uppercase tracking-widest text-sm font-medium mt-4"
                  disabled={submitContact.isPending}
                >
                  {submitContact.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
