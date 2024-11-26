import { Fragment, useEffect, useState } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "../ui/sidebar.tsx";
import { IArticle } from "../../types";
import Link from "../Link";
import { StickyNote, LucideNewspaper } from "lucide-react";
import ApiService from "../../utils/apiService.tsx";

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/articles`;

function NavProjects() {
  const axios = new ApiService({ baseURL: `${API_URL}` });
  // const { data, isLoading } = useSWR("/api/projects", fetcher)
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    const getData = async () => axios.get<{ articles: IArticle[] }>("/");

    getData().then((data) => {
      setIsLoading(false);

      setArticles(data?.data?.articles);
    });
  }, []);

  if (isLoading) {
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

  if (!articles) {
    return <>Loading...</>;
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
                >
                  <div className="text-sm">{article.title}</div>
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
