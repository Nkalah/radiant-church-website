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
                <h3 className="mb-4 text-base font-bold uppercase tracking-widest text-primary md:text-xs md:font-medium">Location</h3>
                <p className="mb-2 font-serif text-3xl font-semibold md:text-2xl md:font-normal">AFM Auditorium</p>
                <p className="text-lg font-semibold leading-relaxed text-foreground md:text-base md:font-light md:text-muted-foreground">
                  Jalandar , Punjab , India<br/>
                  Maheru, Lawgate Jalandhar, Punjab 144001
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-base font-bold uppercase tracking-widest text-primary md:text-xs md:font-medium">Service Times</h3>
                <div className="space-y-2">
                  <p className="flex max-w-xs flex-col gap-1 border-b border-border pb-3 sm:flex-row sm:justify-between sm:pb-2">
                    <span className="text-lg font-semibold text-foreground md:text-base md:font-light md:text-muted-foreground">Sunday Morning</span>
                    <span className="font-mono text-lg font-bold md:text-base md:font-normal">10:00 AM & 13:30 PM</span>
                  </p>
                  <p className="flex max-w-xs flex-col gap-1 border-b border-border pb-3 sm:flex-row sm:justify-between sm:pb-2">
                    <span className="text-lg font-semibold text-foreground md:text-base md:font-light md:text-muted-foreground">Wednesday Night</span>
                    <span className="font-mono text-lg font-bold md:text-base md:font-normal">18:30 PM</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-base font-bold uppercase tracking-widest text-primary md:text-xs md:font-medium">Contact Info</h3>
                <p className="mb-1 text-lg font-semibold text-foreground md:text-base md:font-light md:text-muted-foreground">harrychimbota@gmail.com</p>
                <p className="text-lg font-semibold text-foreground md:text-base md:font-light md:text-muted-foreground">(+91) 7901765936</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-fit rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12"
          >
            <h3 className="mb-8 font-serif text-3xl font-semibold md:text-2xl md:font-normal">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold uppercase tracking-widest md:text-xs md:font-normal">Name</FormLabel>
                      <FormControl>
                        <Input className="h-12 text-lg font-medium md:text-base md:font-normal" {...field} />
                      </FormControl>
                      <FormMessage className="text-base font-semibold" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel className="text-base font-bold uppercase tracking-widest md:text-xs md:font-normal">Email</FormLabel>
                        <FormControl>
                            <Input type="email" className="h-12 text-lg font-medium md:text-base md:font-normal" {...field} />
                        </FormControl>
                        <FormMessage className="text-base font-semibold" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel className="text-base font-bold uppercase tracking-widest md:text-xs md:font-normal">Phone (Optional)</FormLabel>
                        <FormControl>
                            <Input className="h-12 text-lg font-medium md:text-base md:font-normal" {...field} />
                        </FormControl>
                        <FormMessage className="text-base font-semibold" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold uppercase tracking-widest md:text-xs md:font-normal">Subject (Optional)</FormLabel>
                      <FormControl>
                        <Input className="h-12 text-lg font-medium md:text-base md:font-normal" {...field} />
                      </FormControl>
                      <FormMessage className="text-base font-semibold" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold uppercase tracking-widest md:text-xs md:font-normal">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[120px] resize-none text-lg font-medium md:text-base md:font-normal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-base font-semibold" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-4 h-14 w-full text-base font-bold uppercase tracking-widest md:text-sm md:font-medium"
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
