import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 bg-surface">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-2 mb-4">
            Ready to Transform Your Dealership?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400">
            Get in touch with us to learn how dealmaker.at can help your business grow
          </p>
        </div>
        
        <div className="glass-panel p-6 sm:p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 bg-surface-secondary rounded-md border border-white/10 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 bg-surface-secondary rounded-md border border-white/10 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full px-4 py-2 bg-surface-secondary rounded-md border border-white/10 focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex justify-center sm:justify-start">
              <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary-hover">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};