import React from "react";

interface MessageProps {
  text: string;
}

const Message: React.FC<MessageProps> = ({ text }) => {
  return (
    <div className={"flex justify-center text-center "}>
      <p className="font-bold text-4xl text-red-600 mt-10">{text}</p>
    </div>
  );
};

export default Message;
