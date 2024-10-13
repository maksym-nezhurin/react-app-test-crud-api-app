export const Comment = (props) => {
    const { color, data } = props;
    const { content, user } = data;

    return <div className="rounded-xl" style={{ backgroundColor: color, borderRadius: "5px", padding: "10px", color: "white"}}>
        <span>{user}</span>
        <p>{content}</p>
    </div>
}