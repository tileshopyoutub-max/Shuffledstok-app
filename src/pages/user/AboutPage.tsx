import { Header } from "../../user/components/homePage/HeaderHome";
import { FooterHomePage } from "../../user/components/homePage/FooterHome";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="font-display flex-grow pt-40 pb-20 px-6 bg-black">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              About ShuffledStock
            </h1>
            <p className="text-lg text-white/60 font-light">
              Elevating your digital aesthetic through curated media.
            </p>
          </div>

          <article className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed space-y-8 font-light">
            <p>
              Welcome to ShuffledStock, your premier destination for
              high-quality digital assets. We specialize in providing a
              meticulously curated collection of wallpapers, Instagram icons,
              stickers, and other media designed for the modern desktop user.
            </p>

            <p>
              Our mission is to empower creators and individuals by offering
              aesthetic tools that transform their digital environments. At
              ShuffledStock, we believe that the details matter. Whether you are
              personalizing your workspace or refining your social media
              presence, our assets are crafted to offer a premium, minimalist
              feel.
            </p>

            <p>
              We focus on high-quality modern sans-serif typography and clean
              layouts in our own design, and we apply that same standard of
              excellence to every product we offer. Our community of users
              values clean design, high contrast, and the effortless
              sophistication of a dark-themed aesthetic.
            </p>

            <p>
              Innovation and simplicity are at the core of everything we do. We
              are constantly expanding our library to ensure you have access to
              the latest trends in digital media while maintaining the timeless
              quality that ShuffledStock is known for.
            </p>
          </article>

          <div className="pt-12 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs uppercase tracking-[0.4em] font-semibold mb-6">
              Connect With Us
            </p>
            <p className="text-white/70 mb-4">
              Have questions or want to collaborate?
            </p>

            <a
              className="text-xl md:text-2xl font-semibold text-primary hover:text-white transition-all duration-300 underline underline-offset-8"
              href="mailto:shuffledstock.com@outlook.com"
            >
              shuffledstock.com@outlook.com
            </a>
          </div>
        </div>
      </div>
      <FooterHomePage />
    </>
  );
}
