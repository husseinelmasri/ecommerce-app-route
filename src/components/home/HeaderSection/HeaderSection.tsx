import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeaderTypes } from './header-section.types';

export default function HeaderSection({
  headerName,
  sectionName,
  viewAllLink,
}: SectionHeaderTypes) {
  return (
    <div
      className={
        viewAllLink
          ? 'flex flex-col sm:flex-row justify-between sm:items-center mb-8'
          : ''
      }>
      <div className="flex items-center gap-3 my-8">
        <div className="h-8 w-1.5 bg-linear-to-b from-primary to-primary/50 rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {headerName} <span className="text-primary">{sectionName}</span>
        </h2>
      </div>
      {viewAllLink && (
        <Link
          href="/categories"
          className="text-primary self-end sm:self-auto hover:text-primary/80 font-medium flex items-center gap-2">
          {viewAllLink}
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
