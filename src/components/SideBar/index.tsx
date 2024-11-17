// @ts-nocheck

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "../ui/sidebar"
import {pages} from "../../constants/pages.tsx";
import Link from "../Link";
import {useCard} from "../../contexts/CardProvider.tsx";
import {Button} from "../ui/button.tsx";
import {Fragment, Suspense} from "react";
import NavProjects from "../NavProjects";
import {authStore} from "../../stores/authStore.ts";
import {useModal} from "../../hooks/useModal.tsx";
import {logoutUser} from "../../services/user.service.ts";
import LogoutConfirmationModal from "../ConfirmationModal";

export function SideBar() {
    const {token} = authStore;
    const {card} = useCard();
    const {openModal, closeModal} = useModal();

    return (
        <Sidebar variant="inset">
            <SidebarHeader>My application.</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {Object.keys(pages).map((key, index) => {
                                const {path, icon: Icon, label, hidden} = pages[key];

                                return hidden ? null : (
                                    <SidebarMenuItem key={label}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                key={path}
                                                to={path}
                                                className={(isActive) => isActive ? "active-link" : ""}
                                            >
                                                {Icon && <Icon key={index}/>}{label}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Booking</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        key={pages.slots.label}
                                        to={pages.slots.path}
                                        className={(isActive) => isActive ? "active-link" : ""}
                                    >
                                        <pages.slots.icon />
                                        {pages.slots.label}
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild>
                                    <Link
                                        key={pages.bookings.label}
                                        to={pages.bookings.path}
                                        className={(isActive) => isActive ? "active-link" : ""}
                                    >
                                       <pages.bookings.icon /> {pages.bookings.label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Articles</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Suspense fallback={<div>... load ...</div>}>
                            <NavProjects/>
                        </Suspense>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Fragment>
                    {card.total ? <Link to={pages.basket.path} variant={'secondary'}>{pages.basket.label}</Link> : null}

                    <Fragment>
                        {!token &&
                            <Link to="/login" className={(isActive) => isActive ? "active-link" : ""}>Login</Link>}

                        {token && (
                            <Button
                                variant={'destructive'}
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
            <LogoutConfirmationModal withReject={true} confirmButtonLabel={'Confirm logged out!'}
                                     onConfirm={async () => {
                                         await logoutUser();
                                         closeModal();
                                         navigate(pages.auth.path);
                                     }}
                                     onClose={() => {
                                         closeModal()
                                     }}
            >
                <p className={'text-center w-full'}>This action will log out your user!</p>
            </LogoutConfirmationModal>
        </Sidebar>
    )
}
