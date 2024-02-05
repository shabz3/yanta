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
  PopoverTrigger,
  PopoverContent,
  Popover,
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
import { hamburgerMenuItems } from "@/app/lib/definitions";
import EllipsisVerticalIcon20x20 from "../icons/EllipsisVerticalIcon20x20";

export default function NavBar() {
  const currentRoute = usePathname();
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const initialMenuItems: hamburgerMenuItems[] = [
    {
      buttonName: "All Notes",
      buttonIcon: <AllNotesIcon />,
      buttonPath: "/notes",
      classAttributes: "w-full text-main-color",
    },
    {
      buttonName: "New Note",
      buttonIcon: <NewNoteIcon />,
      buttonPath: "/notes/new",
      classAttributes: "w-full text-main-color",
    },
  ];
  const [menuItems, setMenuItems] =
    useState<hamburgerMenuItems[]>(initialMenuItems);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
    resolvedTheme === "light" ? setTheme("light") : setTheme("dark");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    handleSetMenuItems(currentRoute);
  }, [currentRoute]);

  function handleSetMenuItems(path: string) {
    const updatedMenuItems: hamburgerMenuItems[] = menuItems.map((menuItem) => {
      if (menuItem.buttonPath === path) {
        return { ...menuItem, classAttributes: "w-full text-main-color" };
      } else {
        return {
          ...menuItem,
          classAttributes: "w-full dark:text-white text-gray-800",
        };
      }
    });
    setMenuItems(updatedMenuItems);
    setIsMenuOpen(false);
  }

  function DisplayLoginButton() {
    if (isSignedIn) {
      return (
        <Button isIconOnly variant="ghost">
          <UserButton afterSignOutUrl="/" />
        </Button>
      );
    } else if (typeof isSignedIn === "undefined") {
      return <Spinner color="default" />;
    }
    return (
      <Button as={Link} href="/notes" variant="bordered">
        Login
      </Button>
    );
  }

  function ToggleThemeButton() {
    if (!mounted) {
      return <Spinner color="default" />;
    } else {
      return (
        <Button
          isIconOnly
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

  function EllipsisContent() {
    return (
      <>
        <Popover backdrop="opaque">
          <PopoverTrigger>
            <Link className="align-middle ml-1" color="foreground">
              <EllipsisVerticalIcon20x20 />
            </Link>
          </PopoverTrigger>
          <PopoverContent className="dark:bg-zinc-800">
            <div className="content-center px-1 my-2 flex flex-col gap-2">
              <DisplayLoginButton />
              <ToggleThemeButton />
            </div>
          </PopoverContent>
        </Popover>
      </>
    );
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
                className="content-center w-auto h-auto"
                src={logo}
                width={35}
                height={35}
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
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <DisplayLoginButton />
          <ToggleThemeButton />
        </NavbarContent>
        <NavbarContent
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          justify="end"
        >
          <EllipsisContent />
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map(
            (
              { buttonName, buttonIcon, buttonPath, classAttributes },
              index
            ) => (
              <NavbarMenuItem key={`${buttonPath}-${index}`}>
                <Link
                  href={buttonPath}
                  className={classAttributes}
                  size="lg"
                  onClick={() => {
                    handleSetMenuItems(buttonPath);
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
