"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Spacer,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Spinner,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import { NewNoteIcon } from "../icons/NewNoteIcon";
import { AllNotesIcon } from "../icons/AllNotesIcons";
import logo from "@/public/logo.png";
import Image, { StaticImageData } from "next/image";
import { escape } from "querystring";

export default function NavBar() {
  const currentRoute = usePathname();
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([
    {
      buttonName: "All Notes",
      buttonIcon: <AllNotesIcon />,
      buttonPath: "/notes",
      buttonColor: "foreground",
    },
    {
      buttonName: "New Note",
      buttonIcon: <NewNoteIcon />,
      buttonPath: "/notes/new",
      buttonColor: "foreground",
    },
  ]);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
    resolvedTheme === "light" ? setTheme("light") : setTheme("dark");
  }, []);

  useEffect(() => {
    const updatedButtons = menuItems.map((menuItem) => {
      if (menuItem.buttonPath === currentRoute) {
        return { ...menuItem, buttonColor: "primary" };
      } else {
        return { ...menuItem, buttonColor: "foreground" };
      }
    });
    setMenuItems(updatedButtons);
  }, [currentRoute]);

  function handleSetMenuItems(buttonPath: string) {
    const updatedMenuItems = menuItems.map((menuItem) => {
      if (menuItem.buttonPath === buttonPath) {
        return { ...menuItem, buttonColor: "primary" };
      } else {
        return { ...menuItem, buttonColor: "foreground" };
      }
    });
    setMenuItems(updatedMenuItems);
    setIsMenuOpen(false);
  }

  function DisplayLoginButton() {
    if (isSignedIn) {
      return <UserButton afterSignOutUrl="/" />;
    } else if (typeof isSignedIn === "undefined") {
      return <Spinner color="default" />;
    }
    return (
      <Button as={Link} href="/notes" variant="bordered">
        Login/Sign Up
      </Button>
    );
  }

  function ToggleThemeButton() {
    if (!mounted) {
      return <Spinner color="default" />;
    } else {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      );
    }
  }
  return (
    <>
      <Navbar
        className="flex space-x-6"
        isBordered={true}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
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
            "data-[active=true]:after:bg-main-color",
          ],
        }}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="mx-4">
            <Link href="/">
              <Image
                className="content-center h-auto w-auto"
                src={logo}
                width={40}
                height={40}
                alt="Yanta logo"
              />
              <h1 className="text-4xl font-semibold mx-2 dark:text-white text-black">
                <span className="text-main-color">y</span>anta
              </h1>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={currentRoute === "/notes" ? true : false}>
            <Link
              href="/notes"
              className={
                currentRoute === "/notes"
                  ? "text-main-color"
                  : "dark:text-white text-gray-800"
              }
            >
              All Notes &nbsp; {<AllNotesIcon />}
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentRoute === "/notes/new" ? true : false}>
            <Link
              href="/notes/new"
              className={
                currentRoute === "/notes/new"
                  ? "text-main-color"
                  : "dark:text-white text-gray-800"
              }
            >
              New Note &nbsp; {<NewNoteIcon />}
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="ml-4">
            <DisplayLoginButton />
          </NavbarItem>
          <NavbarItem className="r-4">
            <ToggleThemeButton />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map(
            ({ buttonName, buttonIcon, buttonPath, buttonColor }, index) => (
              <NavbarMenuItem key={`${buttonPath}-${index}`}>
                <Link
                  href={buttonPath}
                  className="w-full"
                  size="lg"
                  color={buttonColor}
                  onClick={() => {
                    handleSetMenuItems(buttonName);
                  }}
                >
                  {buttonName} &nbsp; {buttonIcon}
                </Link>
              </NavbarMenuItem>
            )
          )}
        </NavbarMenu>
      </Navbar>
      <Spacer x={4} />
    </>
  );
}
