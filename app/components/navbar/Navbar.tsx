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
// import Link from "next/link";

export default function NavBar() {
  const currentRoute = usePathname();

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
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Spacer x={4} />
    </>
  );
}
