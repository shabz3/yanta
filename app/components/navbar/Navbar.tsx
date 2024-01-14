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
import { AcmeLogo } from "./AcmeLogo";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { NewNoteIcon } from "./NewNoteIcon";
import { AllNotesIcon } from "./AllNotesIcons";

export default function NavBar() {
  const currentRoute = usePathname();
  const { isLoaded, isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([
    {
      buttonName: "All Notes",
      buttonPath: "/notes",
      buttonColor: "foreground",
    },
    {
      buttonName: "New Note",
      buttonPath: "/notes/new",
      buttonColor: "foreground",
    },
  ]);
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
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

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
      <Button as={Link} href="/notes">
        Login/Sign Up
      </Button>
    );
  }

  return (
    <>
      <Navbar
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
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={currentRoute === "/notes" ? true : false}>
            <Link
              href="/notes"
              color={currentRoute === "/notes" ? "primary" : "foreground"}
            >
              All Notes &nbsp; {<AllNotesIcon />}
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentRoute === "/notes/new" ? true : false}>
            <Link
              href="/notes/new"
              color={currentRoute === "/notes/new" ? "primary" : "foreground"}
            >
              New Note &nbsp; {<NewNoteIcon />}
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <DisplayLoginButton />
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="light"
              onClick={() =>
                currentTheme == "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              {currentTheme === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map(({ buttonName, buttonPath, buttonColor }, index) => (
            <NavbarMenuItem key={`${buttonPath}-${index}`}>
              <Link
                href={buttonPath}
                className="w-full"
                size="lg"
                color={buttonColor}
                onPress={() => {
                  handleSetMenuItems(buttonName);
                }}
              >
                {buttonName}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <Spacer x={4} />
    </>
  );
}
