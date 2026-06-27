import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, staggerItem } from "@/components/shared/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="bg-secondary/20 px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Loved by teams"
          title="Built for the teams who ship"
          description="Developers and HR leaders use this template to launch polished admin dashboards fast."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={staggerItem}>
              <Card className="relative flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-foreground/90">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
