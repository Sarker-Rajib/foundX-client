'use client'
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function DropDownButton() {
  const router = useRouter();

  const handleNavigation = (pathname: string) => {
    router.push(pathname)
  }

  const items = [
    {
      key: "new",
      label: "Profile",
      navigate: "/profile"
    },
    {
      key: "set",
      label: "Settings",
      navigate: "/profile/settings"
    },
    {
      key: "about",
      label: "About",
      navigate: "/profile/about"
    },
    {
      key: "claim",
      label: "Claim Requests",
      navigate: "/profile/claim-requests"
    },

  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
        >
          <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            className={item.key === "delete" ? "text-danger" : ""}
            onClick={() => handleNavigation(item.navigate)}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}