import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div
          className="relative overflow-hidden rounded-3xl p-12 text-center text-white shadow-2xl md:p-16"
          style={{ background: "linear-gradient(135deg, #0095DD, #005FA3)" }}
          >
          {/* Decorative blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_60%)]"
          />

          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Start Building Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/80 md:text-lg">
              Pick a template, customize it to match your brand, and ship a
              production-ready application in record time.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="border border-white/20 bg-white text-[#005FA3] hover:bg-white/90"
                asChild
              >
                <Link to="/templates">
                  Browse Templates
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
