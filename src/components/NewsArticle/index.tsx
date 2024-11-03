import {INews} from "../../types";

const NewsArticle = ({ article }: { article: INews}) => {
    const { title, url, urlToImage, description, publishedAt, source, author } = article;

    return (
        <div className="max-w-xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
            {urlToImage && (
                <img
                    className="w-full h-64 object-cover object-center"
                    src={urlToImage}
                    alt={`Image for ${title}`}
                />
            )}

            <div className="p-6">
                <div>
                    {source && source.name && (
                        <span className="text-xs font-medium text-blue-600 uppercase">{source.name}</span>
                    )}
                    <a href={url} target="_blank" rel="noopener noreferrer" className="block mt-2 text-2xl font-semibold text-gray-800 hover:text-gray-600">
                        {title}
                    </a>
                    <p className="mt-2 text-sm text-gray-600">{description}</p>
                </div>

                <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0-14c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"/></svg>
                        <p className="leading-none">{author || 'Unknown'}</p>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(publishedAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default NewsArticle;
