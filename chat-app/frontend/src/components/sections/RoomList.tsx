// components/RoomList.tsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ChatRoom, IChatRoom } from '../interfaces/interfaces';

interface RoomListProps {
      rooms: IChatRoom[];
      onRoomSelect: (room: IChatRoom) => void;
      selectedRoomId?: string;
      onCreateRoomClick: () => void;
}

export const RoomList: React.FC<RoomListProps> = ({
      rooms,
      onRoomSelect,
      selectedRoomId,
      onCreateRoomClick
}) => {
      console.log("Roooms", rooms)
      return (
            <div className="w-80 bg-gray-50 h-screen border-r border-gray-200 flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                        <button
                              onClick={onCreateRoomClick}
                              className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                              Create New Room
                        </button>
                  </div>

                  <div className="overflow-y-auto flex-1">
                        {!rooms || rooms.length === 0 ? (
                              <div className="text-center text-gray-500 mt-8">
                                    No rooms available
                              </div>
                        ) : (
                              rooms.map((room) => (
                                    <div
                                          key={room.id}
                                          onClick={() => onRoomSelect(room)}
                                          className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200
                                ${selectedRoomId === room.id ? 'bg-blue-50' : ''}
                            `}
                                    >
                                          <div className="font-semibold text-gray-900">
                                                {room.name}
                                          </div>
                                          {room.description && (
                                                <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                                                      {room.description}
                                                </div>
                                          )}
                                          <div className="flex items-center justify-between mt-2">
                                                <div className="text-xs text-gray-400">
                                                      {/* {room.participants.length} participants */}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                      {/* {formatDistanceToNow(new Date(room.lastActivity), {
                                                            addSuffix: true
                                                      })} */}
                                                </div>
                                          </div>
                                    </div>
                              ))
                        )}
                  </div>
            </div>
      );
};