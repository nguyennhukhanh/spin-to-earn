import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary">
      <div className="container flex flex-col justify-between py-6 lg:flex-row">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          <p className="text-sm font-medium text-white">Spin to Earn © Copyright 2024</p>
          <Link
            href={'#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#7F7F7F] transition-all hover:opacity-70 active:brightness-110"
          >
            Term of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
