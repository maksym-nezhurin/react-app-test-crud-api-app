import React, {Fragment} from 'react';
import { Status} from '../../types';
import {Link} from "react-router-dom";
import {cn} from "../../lib/utils.ts";
import {ArticleForm} from "../Forms/ArticleForm";
import {useStickyBox} from "react-sticky-box";
import ArticleStore from "../../stores/articlesStore.ts";
import { observer } from 'mobx-react-lite';


const ArticleList: React.FC = observer(() => {
    const { articles } = ArticleStore;
    const stickyRef = useStickyBox({offsetTop: 20, offsetBottom: 20});

    if (!articles) {
        return <p>Loading article...</p>;
    }

    return (
      <Fragment>
          <div>
              <div className={"p-4 min-w-[250px]"}>
                  {
                    !articles.length && <div className={'font-bold'}>No articles!</div>
                  }
              </div>

              <div ref={stickyRef} className="max-h-[500px] overflow-y-scroll ml-6 -rotate-0">
                  <ul className="space-y-4">
                      {articles.map((article) => (
                        <li
                          key={article._id}
                          className={cn('cursor-pointer p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow', {
                              ['border-yellow-800']: article.status === Status.Draft,
                              ['border-green-800']: article.status === Status.Published,
                              ['border-gray-800']: article.status === Status.Archived,
                          })}
                        >
                            <div className="flex justify-end">
                                <div className={cn("border rounded-xl px-2 py-0.5 text-xs", {
                                    ['bg-yellow-800 text-yellow-100']: article.status === Status.Draft,
                                    ['bg-green-800 text-green-100']: article.status === Status.Published,
                                    ['bg-gray-800 text-gray-100']: article.status === Status.Archived,
                                })}>{article.status}</div>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <Link to={`/articles/${article._id}`}>{article.title}</Link>
                            </div>
                        </li>
                      ))}
                  </ul>
              </div>
          </div>

          <div>
              <ArticleForm />
          </div>
      </Fragment>
    );
});

export default ArticleList;
