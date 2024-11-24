import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container p-4 flex flex-col md:flex-row items-center justify-between">
        <Link
          href="/"
          className="flex justify-center sm:justify-start items-center gap-2"
        >
          <Image
            src="/assets/logo.png"
            width={120}
            height={120}
            className="size-10"
            alt="Logo"
          />

          <span>React Forms</span>
        </Link>

        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
