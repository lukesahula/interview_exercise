"use client";
import { useSession } from "next-auth/react";
import NavigationItem from "@/app/components/NavigationItem";
import Image from "next/image";
import LogoutButton from "@/app/components/LogoutButton";
import Link from "next/link";

const Navigation = () => {
  const PublicNavItems = [
    {
      slug: "/",
      label: "Recent Articles",
    },
    {
      slug: "/about",
      label: "About",
    },
  ];
  const ProtectedNavItems = [
    {
      slug: "/my-articles",
      label: "My Articles",
    },
    {
      slug: "/create-article",
      label: "Create Article",
    },
  ];

  const { data: session } = useSession();

  return (
    <div className="flex justify-between bg-foreground text-background py-6 px-12">
      <div className="flex gap-8 items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
        </Link>
        {PublicNavItems.map((item) => (
          <NavigationItem key={item.slug} slug={item.slug} label={item.label} />
        ))}
      </div>
      <div className="flex gap-8 items-center">
        {session?.accessToken ? (
          <>
            {ProtectedNavItems.map((item) => (
              <NavigationItem
                key={item.slug}
                slug={item.slug}
                label={item.label}
              />
            ))}
            <LogoutButton />
          </>
        ) : (
          <NavigationItem slug="/login" label="Log In" />
        )}
      </div>
    </div>
  );
};

export default Navigation;
