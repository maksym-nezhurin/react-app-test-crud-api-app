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
import {useAuth} from "../../contexts/AuthProvider.tsx";
import {useCard} from "../../contexts/CardProvider.tsx";
import {Button} from "../ui/button.tsx";
import {Fragment, Suspense} from "react";
import NavProjects from "../NavProjects";

export function SideBar() {
    const { logout, token } = useAuth();
    const { card } = useCard();

    return (
        <Sidebar variant="inset">
            <SidebarHeader>My application.</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {Object.keys(pages).map((key, index) => {
                                const { path, icon : Icon, label, hidden } = pages[key];

                                return hidden ? null : (
                                    <SidebarMenuItem key={label}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                key={path}
                                                to={path}
                                                className={(isActive) => isActive ? "active-link" : ""}
                                            >
                                                {Icon && <Icon key={index}/> }{label}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Articles</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Suspense fallback={<div>... load ...</div>}>
                            <NavProjects />
                        </Suspense>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Fragment>
                    { card.total ? <Link to={pages.basket.path} variant={'secondary'}>{pages.basket.label}</Link> : null}

                    <Fragment>
                        {!token && <Link to="/login" className={(isActive) => isActive ? "active-link" : ""}>Login</Link>}

                        {token && (
                            <Button
                                variant={'destructive'}
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Log out
                            </Button>
                        )}
                    </Fragment>
                </Fragment>
            </SidebarFooter>
        </Sidebar>
    )
}
