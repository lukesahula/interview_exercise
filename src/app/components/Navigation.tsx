"use client";
import { useSession } from "next-auth/react";
import { NavigationItem } from "./NavigationItem";
import Image from "next/image";
import { LogoutButton } from "./LogoutButton";

export function Navigation() {
  const PublicNavItems = [
    {
      slug: "/articles",
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
    <div className="flex justify-between bg-white text-background py-6 px-12">
      <div className="flex gap-8 items-center">
        <Image src="/logo.png" alt="logo" width={30} height={30} />
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
}
