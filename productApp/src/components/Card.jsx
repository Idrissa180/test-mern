import React from "react";

export default function Card({data}) {
  return (
    <div className="card">
      <div>
        <h2>{data.devise && data.devise} {data.count}</h2>
        <p>{data.title}</p>
      </div>
    </div>
  );
}
