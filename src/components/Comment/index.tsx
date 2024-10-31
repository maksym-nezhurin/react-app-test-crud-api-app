import { IComment } from "../../types";

interface IProps {
    color: string,
    data: IComment
}

export const Comment = (props: IProps) => {
    const { color, data } = props;
    const { content, user, createdAt } = data;

    return <div
     style={{ backgroundColor: color, borderRadius: "5px", padding: "10px", color: "white",
         display: "flex",
         alignItems: "end",
         flexDirection: "column"}}>
        <div
            style={{display: "flex", alignItems: "flex-end", color: "green"}}>
            <span>{user}</span>
            <span style={{marginLeft: '1rem', color: 'blue'}}>Date: {(new Date(createdAt)).toLocaleTimeString()}</span>
        </div>

        <p>{content}</p>
    </div>
}