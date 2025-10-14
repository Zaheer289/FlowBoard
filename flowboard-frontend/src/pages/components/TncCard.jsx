function TncCard({idx, title, body}){
    return (
    <div className="border border-2 border-cyan-700 my-3 p-5">
        <h1 className="text-xl font-semibold mb-2">{idx}: {title}</h1>
        <p>{body}</p>
    </div>
    )
}
export default TncCard;