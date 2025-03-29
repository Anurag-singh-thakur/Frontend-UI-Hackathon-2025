import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <ChatHeader
          name="John Doe"
          status="online"
          avatar="https://i.pravatar.cc/150?img=1"
        />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <MessageBubble
              content="Hey, how are you?"
              timestamp={new Date()}
              isOwn={false}
            />
            <MessageBubble
              content="I'm doing great! How about you?"
              timestamp={new Date()}
              isOwn={true}
              status="read"
            />
            {/* Add more messages as needed */}
          </div>
        </div>
        <ChatInput />
      </div>
    </div>
  );
}