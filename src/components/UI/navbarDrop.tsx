'use client'
import { useUser } from "@/src/context/user.provider";
import { logOutUser } from "@/src/services/AuthService";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function DropDownButton() {
  const router = useRouter();
  const { user, setIsLoading } = useUser();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="w-[50px] p-0"
          variant="light"
        >
          <Avatar isBordered radius="full" src={user?.profilePhoto} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Nav Actions" >
        <DropdownItem
          key={'profile'}
          onClick={() => router.push("/profile")}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          key={'settings'}
          onClick={() => router.push("/profile/settings")}
        >
          Settings
        </DropdownItem>
        <DropdownItem
          key={'about'}
          onClick={() => router.push("/profile/about")}
        >
          About
        </DropdownItem>
        <DropdownItem
          key={'claim'}
          onClick={() => router.push("/profile/claim-requests")}
        >
          Claim Requests
        </DropdownItem>
        <DropdownItem
          key={'logout'}
          color={"danger"}
          onClick={() => {
            logOutUser();
            setIsLoading(true);
          }
          }
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}