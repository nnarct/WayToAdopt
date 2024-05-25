import React from "react";
import { Link } from "react-router-dom";

const CardPostID = ({ postID }: { postID: number }) => {
    return (
        <Link to={`/petdetails`} state={{ postID }}>
            {/* Content of the card */}
            <div>Card for post {postID}</div>
        </Link>
    );
};

export default CardPostID;
