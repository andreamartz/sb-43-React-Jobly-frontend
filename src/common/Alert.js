import React from "react";

function Alert({ type = "danger", messages = []}) {
  console.debug("Alert", "type=", type, "messages=", messages);

  return (
    <div>
      {messages.map(err => (
        <p key={err}>
          {err}
        </p>
      ))}
    </div>
  )
}

export default Alert;