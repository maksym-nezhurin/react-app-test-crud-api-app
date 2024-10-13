interface IProps {
    color: string,
    data: {
        content: React.ReactNode,
        user: string
    }
}

export const Comment = (props: IProps) => {
    const { color, data } = props;
    const { content, user } = data;

    return <div className="rounded-xl" style={{ backgroundColor: color, borderRadius: "5px", padding: "10px", color: "white", display: "flex", flexDirection: "column"}}>
        <div style={{ display: "flex", justifyContent: "flex-end", color: "green" }}>
            <span>{user}</span>
        </div>
        
        <p>{content}</p>
    </div>
}