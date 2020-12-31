import React from 'react';


const Card = (props) => {
    return (
        <article className="card">
            {props.children ?? "empty card"}
        </article>
    );
};

export default Card;
