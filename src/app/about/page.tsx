import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Kalamos Care — named for a Greek myth of love and loss, and built as a tribute to those lost during the HIV epidemic.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-shadow-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            The Parable of Kalamos
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-warm max-w-none space-y-6">
            <p className="text-lg text-warm-600 leading-relaxed">
              In Greek mythology, Kalamos was the son of the river-god Meander.
              He loved Karpos, the son of Zephyrus. When Karpos drowned, Kalamos
              was so consumed by grief that he joined him in death — and the gods
              transformed him into a river reed, a living symbol of their love.
            </p>
            <p className="text-warm-600 leading-relaxed">
              Centuries later, Walt Whitman drew on this story in{" "}
              <em>Leaves of Grass</em>, using it as a frame for artistic
              expression of personal identity. The name Kalamos carries forward
              a tradition of turning pain into something meaningful — of honoring
              what we&apos;ve lost by building something better.
            </p>
            <p className="text-warm-600 leading-relaxed">
              For us, Kalamos also serves as a tribute to all those who lost
              their lives during the HIV epidemic. We carry their courage
              forward, working to ensure that the communities most affected have
              access to the care they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-warm-900 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-primary-700 font-medium leading-relaxed">
            To make sexual wellness approachable and accessible for everyone.
          </p>
        </div>
      </section>

      {/* The awkwardness */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-warm-900 mb-6">
            Sexual health can be awkward; it doesn&apos;t have to be
          </h2>
          <div className="prose prose-warm max-w-none space-y-4">
            <p className="text-warm-600 leading-relaxed">
              Healthcare is often reactive and fear-based — especially when it
              comes to sexual health. We believe it can be different. By making
              services convenient and empowering patients to participate in their
              own care, we&apos;re transforming what it means to take care of
              yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-warm max-w-none space-y-4">
            <p className="text-warm-600 leading-relaxed">
              The first time our founder got an STI test, the anxiety was real.
              But the experience itself? It was reassuring — kind clinic staff, a
              straightforward process, and a sense of knowledge, security, and
              confidence on the other side.
            </p>
            <p className="text-warm-600 leading-relaxed">
              That experience planted a seed:{" "}
              <em>everyone deserves affirmative access to sexual wellness.</em>{" "}
              Not just those lucky enough to find the right clinic on the right
              day. That&apos;s why Kalamos exists.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-warm-900 mb-4">
            We are iterative, connective, research-aligned, and practical.
          </h2>
          <p className="text-warm-600 leading-relaxed">
            We&apos;re a small but growing group of queer folk who want better
            care — modeled around our needs and our convenience. We build tools
            and services that work for the people they&apos;re meant to serve,
            not the other way around.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-shadow-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold">
            Bring adherence counseling to your practice today
          </h2>
          <div className="mt-6">
            <Link href="/contact">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
