import { IComment } from "../../types";

interface IProps {
    color: string,
    data: IComment,
    isAuthor: boolean // New prop to identify if the comment is from the author
}

export const Comment = ({ data, isAuthor }: IProps) => {
    const { content, createdAt } = data;

    // Conditional classes for author's comment
    const authorStyles = isAuthor ? 'border-l-4  bg-blue-100 text-blue-900 border-blue-500 mr-4' : `ml-4 border-r-4 bg-blue-300 text-white border-blue-800`;

    return (
        <div className={`${authorStyles} max-w-[300px] rounded-md p-4 flex flex-col justify-end`}>
            <div className="flex items-end justify-between">
                <span className="font-semibold">
                    {isAuthor ?
                        <span className="ml-2 px-2 py-1 text-xs rounded-full text-white bg-blue-500">Author</span> :
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full text-white bg-blue-700`}>Guest</span>
                    } {/* Badge for author */}
                </span>
                <span className="ml-4 text-gray-500">Date: {(new Date(createdAt)).toLocaleTimeString()}</span>
            </div>
            <p className="mt-2 text-sm text-left indent-5">{content}</p>
        </div>
    );
}
