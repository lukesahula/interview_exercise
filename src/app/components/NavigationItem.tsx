import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavigationItem = ({ slug, label }: { slug: string; label: string }) => {
  const pathName = usePathname();
  return (
    <Link
      className={classNames("hover:underline", {
        underline: pathName === slug,
      })}
      href={slug}
    >
      {label}
    </Link>
  );
};

export default NavigationItem;
