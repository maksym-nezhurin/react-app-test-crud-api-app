import { Fragment } from 'react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '../ui/sidebar.tsx';
import Link from '../Link';
import { StickyNote, LucideNewspaper } from 'lucide-react';
import { Badge } from '../ui/badge.tsx';
import ArticleStore from '../../stores/articlesStore.ts';
import { observer } from 'mobx-react-lite';
import { IArticle } from '../../types';

const Articles = observer(() => {
  const { articles } = ArticleStore;

  if (articles.length === 0) {
    return (
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  } else {
    return (
      <SidebarMenu>
        {articles.map((article: IArticle) => (
          <SidebarMenuItem key={article._id}>
            <SidebarMenuButton asChild>
              <div className={'flex ml-2'}>
                <StickyNote />
                <Link
                  to={`/articles/${article._id}`}
                  size={'sm'}
                  state={'enabled'}
                  variant={'subtle'}
                  className={'flex justify-between w-full'}
                >
                  <div className="text-sm">{article.title}</div>
                  <Badge>{article.comments.length}</Badge>
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }
});

function NavProjects() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <div className={'flex'}>
            <LucideNewspaper />

            <Link to={`/articles/`} size={'sm'} variant={'subtle'}>
              <div className="text-sm">Articles</div>
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <Fragment>
        <Articles />
      </Fragment>
    </SidebarMenu>
  );
}

export default NavProjects;
