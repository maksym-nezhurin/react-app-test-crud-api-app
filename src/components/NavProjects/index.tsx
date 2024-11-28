import { Fragment, useEffect, useState } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "../ui/sidebar.tsx";
import { IArticle } from "../../types";
import Link from "../Link";
import { StickyNote, LucideNewspaper } from 'lucide-react';
import { getArticles } from '../../services/articles.service.ts';
import { Badge } from '../ui/badge.tsx';
import requestStore from '../../stores/requestStore.ts';

function NavProjects() {
  const { isRequested } = requestStore;
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    console.log('requested');
    getArticles().then(articles => setArticles(articles));
  }, [isRequested]);

  if (!articles) {
    return (
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <div className={"flex"}>
            <LucideNewspaper />

            <Link to={`/articles/`} size={"sm"} variant={"subtle"}>
              <div className="text-sm">Articles</div>
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <Fragment>
        {articles.map((article) => (
          <SidebarMenuItem key={article.title}>
            <SidebarMenuButton asChild>
              <div className={"flex ml-2"}>
                <StickyNote />
                <Link
                  to={`/articles/${article._id}`}
                  size={"sm"}
                  state={"enabled"}
                  variant={"subtle"}
                  className={'flex justify-between w-full'}
                >
                  <div className="text-sm">{article.title}</div>
                  <Badge>{article.comments.length}</Badge>
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </Fragment>
    </SidebarMenu>
  );
}

export default NavProjects;
