import React, { useEffect, useState } from 'react';
import { IArticle, Status } from '../../types';
import StorageWrapper from '../../utils/storageWrapper.ts';
import { formatDate } from '../../utils/dates.ts';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { Button } from '../ui/button.tsx';
import { Modal } from '../Modal';
import { ArticleForm, Mode } from '../Forms/ArticleForm';
import { useModal } from '../../hooks/useModal.tsx';
import { Badge as SBadge } from '../ui/badge.tsx';
import { soonerNotify } from '../../utils/notify.ts';
import { pages } from '../../constants/pages.tsx';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { deleteArticle, getArticleById } from '../../services/articles.service.ts';

interface ArticleProps {
  id: string;
}

const storage = new StorageWrapper();

const Article: React.FC<ArticleProps> = ({ id }) => {
  const [article, setArticle] = useState<IArticle>({
    author: { _id: '', email: '', name: '' },
    createdAt: '',
    tags: [],
    comments: [],
    _id: '',
    title: '',
    content: '',
    status: Status.Draft
  });
  const userId = storage.getItem("userId");
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    getArticleById(id).then(setArticle);
  }, [id]);

  const onArticleUpdate = (article: IArticle) => {
    setArticle(article);
    closeModal();
  };

  const onArticleDelete = (id: string) => {
    deleteArticle(id).then((message) => soonerNotify(message, "warning"));
    navigate(pages.articles.path);
  };

  const variant = article?.status === Status.Draft
    ? "destructive"
    : article?.status === Status.Archived
      ? "secondary"
      : "outline";

  if (!article) {
    return <p>Loading article...</p>;
  }

  return (
    <div className={"w-full"}>
      <div className="row" style={{ display: "flex" }}>
        {id && (
          <div className="w-full">
            <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
              <div className="p-5 pt-10 relative">
                <Button
                  size={"sm"}
                  variant={"outline"}
                  className={"absolute right-4 top-10"}
                  onClick={() => openModal()}
                >
                  <Pencil1Icon />
                </Button>
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  className={"absolute right-4 top-20"}
                  onClick={() => onArticleDelete(id)}
                >
                  <Cross1Icon />
                </Button>
                <Modal
                  title="Edit the current article"
                  description="Put all the dat into the fields!"
                >
                  <ArticleForm
                    mode={Mode.edit}
                    onSuccess={onArticleUpdate}
                    passedData={article}
                  />
                </Modal>

                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg
                      className="w-4 h-4 mr-2 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-8 4h8a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2zM8 21h8m-8 0v-4m0 4H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-3m-8 0h8"
                      />
                    </svg>

                    {formatDate(article.createdAt)}
                  </div>
                </div>

                <SBadge
                  className={"my-2 absolute top-0 right-4 px-2 py-1 font-semibold"}
                  variant={variant}
                >
                  {article.status?.toUpperCase()}
                </SBadge>

                {article.author && (
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Author: {article.author.name}
                  </h3>
                )}
                {userId && (
                  <p className={"text-xs text-right"}>User with id: {userId}</p>
                )}

                <h4 className={"my-2 font-bold"}>{article.title}</h4>
                <p className="mb-3 font-normal text-gray-700">
                  <MDEditor.Markdown source={article.content} />
                </p>

                <div className="mt-4">
                  <span className="text-sm text-gray-500">
                    Comments: {article.comments?.length}
                  </span>
                </div>
                <div className="mt-2">
                  {article.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="mr-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
