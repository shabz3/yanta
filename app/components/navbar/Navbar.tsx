"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Spacer,
  Link,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";

export default function NavBar() {
  const currentRoute = usePathname();
  const { isLoaded, isSignedIn } = useAuth();
  console.log(isSignedIn);

  function displayLoginButton() {
    if (isSignedIn) {
      return <UserButton afterSignOutUrl="/" />;
    } else if (typeof isSignedIn === "undefined") {
      return <Button href="#" isLoading />;
    }
    return <Button href="#">Login/Sign Up</Button>;
  }

  return (
    <>
      <Navbar
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={currentRoute === "/notes" ? true : false}>
            <Link
              href="/notes"
              color={currentRoute === "/notes" ? "primary" : "foreground"}
            >
              All Notes
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentRoute === "/notes/new" ? true : false}>
            <Link
              href="/notes/new"
              color={currentRoute === "/notes/new" ? "primary" : "foreground"}
            >
              New Note
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>{displayLoginButton()}</NavbarItem>
        </NavbarContent>
      </Navbar>
      <Spacer x={4} />
    </>
  );
}
