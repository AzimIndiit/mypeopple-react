import { memo } from "react";
import { Message } from "./Message";


export const MessageList = memo(({ messages, messageRef, onEstimateAction, currentUserId }: { messages: any, messageRef: any, onEstimateAction: any, currentUserId: any }) => {
    return (
      <div className="text-[14px] font-primary my-4 space-y-4 h-[60vh] overflow-y-auto">
        {messages.map((message: any, index: any) => (
          <Message
            key={message.id}
            message={message}
            messageRef={index === messages.length - 1 ? messageRef : null}
            onEstimateAction={onEstimateAction}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    );
  });