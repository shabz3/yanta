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
import { AcmeLogo } from "../icons/AcmeLogo";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import { NewNoteIcon } from "../icons/NewNoteIcon";
import { AllNotesIcon } from "../icons/AllNotesIcons";

export default function NavBar() {
  const currentRoute = usePathname();
  const { isLoaded, isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([
    {
      buttonName: "All Notes",
      buttonIcon: AllNotesIcon,
      buttonPath: "/notes",
      buttonColor: "foreground",
    },
    {
      buttonName: "New Note",
      buttonIcon: NewNoteIcon,
      buttonPath: "/notes/new",
      buttonColor: "foreground",
    },
  ]);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
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

  return (
    <>
      <Navbar
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
        <NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <Link href="/">
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={currentRoute === "/notes" ? true : false}>
            <Link
              href="/notes"
              className={
                currentRoute === "/notes"
                  ? "text-main-color"
                  : "dark:text-white text-gray-800"
              }
              // color={currentRoute === "/notes" ? "primary" : "foreground"}
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
              // color={currentRoute === "/notes/new" ? "primary" : "foreground"}
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
              variant="ghost"
              onClick={() =>
                currentTheme == "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              {currentTheme === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
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
                  onPress={() => {
                    handleSetMenuItems(buttonName);
                  }}
                >
                  {buttonName} &nbsp; {buttonIcon()}
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
