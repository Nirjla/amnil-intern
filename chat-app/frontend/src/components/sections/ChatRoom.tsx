import React, { useState, useEffect, useRef } from 'react';
import { ChatService } from '../../services/ChatService';
import useApi from '../../hooks/useApi';
import { IResponse, IUserResponse, Message } from '../interfaces/interfaces';

interface ChatRoomProps {
      chatRoomId: string;
      currentUser: IUserResponse;
      token: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({
      chatRoomId,
      currentUser,
      token
}) => {
      const [messages, setMessages] = useState<Message[]>([]);
      const [newMessage, setNewMessage] = useState('');
      const messagesEndRef = useRef<HTMLDivElement>(null);
      const chatServiceRef = useRef<ChatService | null>(null);

      //fetch initial messages
      const {
            data: fetchedMessages,
            error: fetchError,
            loading: isLoading,
      } = useApi<IResponse<Message[]>>(`/rooms/${chatRoomId}/messages`, 'GET', null, [chatRoomId]);

      //oinitialize chat service and handle real-time updates
      useEffect(() => {
            const initializeChat = async () => {
                  try {
                        chatServiceRef.current = new ChatService(token);
                        const chatService = chatServiceRef.current;

                        await chatService.connect();
                        await chatService.joinRoom(chatRoomId).catch(err => { console.error("Failed to join room", err) });

                        chatService.onNewMessage((message: Message) => {
                              console.log('Received new message:', message);
                              setMessages(prevMessages => {
                                    if (!prevMessages.some(m => m.id === message.id)) {
                                          return [...prevMessages, message];
                                    }
                                    return prevMessages;
                              });
                        });

                  } catch (err) {
                        console.error('Error initializing chat:', err);
                  }
            };

            initializeChat();

            return () => {
                  if (chatServiceRef.current) {
                        chatServiceRef.current.leaveRoom(chatRoomId).catch(err => {
                              console.error('Failed to leave room', err)
                        });
                        chatServiceRef.current.disconnect();
                  }
            };
      }, [chatRoomId, token]);

      //update messages when initially fetched
      useEffect(() => {
            if (fetchedMessages) {
                  setMessages(fetchedMessages.data || []);
            }
      }, [fetchedMessages]);

      //scroll to bottom when new messages arrive
      useEffect(() => {
            if (messagesEndRef.current) {
                  messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
      }, [messages]);

      const handleSendMessage = async (e: React.FormEvent) => {
            e.preventDefault();
            const messageContent = newMessage.trim();

            if (messageContent && chatServiceRef.current) {
                  try {
                        setNewMessage('');
                        await chatServiceRef.current.sendMessage(messageContent, chatRoomId);
                  } catch (error) {
                        console.error('Error sending message:', error);
                        alert('Failed to send message. Please try again.');
                  }
            }
      };

      if (isLoading) {
            return (
                  <div className="flex items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
            );
      }

      if (fetchError) {
            return (
                  <div className="flex items-center justify-center h-screen">
                        <div className="text-red-500">Failed to load messages. Please try again later.</div>
                  </div>
            );
      }

      return (
            <div className="flex flex-col h-screen">
                  <div className="bg-white border-b border-gray-200 px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                              Chat Room
                        </h2>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                        {messages.map((message, index) => (
                              <div
                                    key={message.id || index}
                                    className={`flex ${message.sender.id === currentUser.id
                                          ? 'justify-end'
                                          : 'justify-start'
                                          }`}
                              >
                                    <div className={`max-w-[70%] rounded-lg px-4 py-2 ${message.sender.id === currentUser.id
                                          ? 'bg-blue-500 text-white'
                                          : 'bg-white border border-gray-200'
                                          }`}>
                                          <div className="text-sm font-medium mb-1">
                                                {message.sender.name}
                                          </div>
                                          <div className="break-words">
                                                {message.content}
                                          </div>
                                          <div className="text-xs mt-1 opacity-75">
                                                {new Date(message.created_at).toLocaleTimeString()}
                                          </div>
                                    </div>
                              </div>
                        ))}
                        <div ref={messagesEndRef} />
                  </div>

                  <form
                        onSubmit={handleSendMessage}
                        className="bg-white border-t border-gray-200 px-6 py-4"
                  >
                        <div className="flex space-x-4">
                              <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                              >
                                    Send
                              </button>
                        </div>
                  </form>
            </div>
      );
};