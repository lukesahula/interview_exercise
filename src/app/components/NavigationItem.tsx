import Link from "next/link";

export function NavigationItem({
  slug,
  label,
}: {
  slug: string;
  label: string;
}) {
  return (
    <Link className="hover:underline" href={slug}>
      {label}
    </Link>
  );
}
