import { IComment } from "../../types";

interface IProps {
    color: string,
    data: IComment
}

export const Comment = (props: IProps) => {
    const { color, data } = props;
    const { content, user, createdAt } = data;

    return <div
     style={{ backgroundColor: color, borderRadius: "5px", padding: "10px", color: "white", display: "flex", flexDirection: "column"}}>
        <div
         style={{ display: "flex", justifyContent: "flex-end", color: "green" }}>
            <span>{user}
                <span style={{ marginLeft: '1rem', color: 'blue'}}>Date: {(new Date(createdAt)).toLocaleTimeString()}</span>
            </span>
        </div>
        
        <p>{content}</p>
    </div>
}