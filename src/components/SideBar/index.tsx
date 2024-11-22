// @ts-nocheck

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";

import { pages } from "../../constants/pages.tsx";
import Link from "../Link";
import { useCard } from "../../contexts/CardProvider.tsx";
import { Button } from "../ui/button.tsx";
import { Fragment, Suspense } from "react";
import NavProjects from "../NavProjects";
import { authStore } from "../../stores/authStore.ts";
import { useModal } from "../../hooks/useModal.tsx";
import { logoutUser } from "../../services/user.service.ts";
import LogoutConfirmationModal from "../ConfirmationModal";
import { ChevronDown } from 'lucide-react';

export function SideBar() {
  const { isLoggedIn } = authStore;
  const { card } = useCard();
  const { openModal, closeModal } = useModal();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>My application.</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.keys(pages).map((key, index) => {
                const { path, icon: Icon, label, hidden = false } = pages[key];

                return hidden ? null : (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton asChild>
                      <Link
                        key={path}
                        to={path}
                        state={!isLoggedIn ? "disabled" : "enabled"}
                        className={(isActive) =>
                          isActive ? "active-link" : ""
                        }
                      >
                        {Icon && <Icon key={index} />}
                        {label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {isLoggedIn && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Articles
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <Suspense fallback={<div>... load ...</div>}>
                  <NavProjects />
                </Suspense>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}
      </SidebarContent>
      <SidebarFooter>
        <Fragment>
          {card.total ? (
            <Link to={pages.basket.path} variant={"secondary"}>
              {pages.basket.label}
            </Link>
          ) : null}

          <Fragment>
            {!isLoggedIn && (
              <Link
                to="/login"
                className={(isActive) => (isActive ? "active-link" : "")}
              >
                Login
              </Link>
            )}

            {isLoggedIn && (
              <Button
                variant={"destructive"}
                onClick={() => {
                  openModal();
                }}
              >
                Log out
              </Button>
            )}
          </Fragment>
        </Fragment>
      </SidebarFooter>
      <LogoutConfirmationModal
        withReject={true}
        confirmButtonLabel={"Confirm logged out!"}
        onConfirm={async () => {
          await logoutUser();
          closeModal();
          navigate(pages.auth.path);
        }}
        onClose={() => {
          closeModal();
        }}
      >
        <p className={"text-center w-full"}>
          This action will log out your user!
        </p>
      </LogoutConfirmationModal>
    </Sidebar>
  );
}
