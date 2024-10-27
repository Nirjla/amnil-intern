// components/RoomList.tsx
import React, { useState } from 'react';
import { ChatRoom, IChatRoom } from '../interfaces/interfaces';

interface RoomListProps {
      rooms: IChatRoom[];
      onRoomSelect: (room: IChatRoom) => void;
      selectedRoomId?: string;
      onCreateRoomClick: () => void;
      toggleDropdown: () => void
      handleFilterClick: (filter: string) => void
      selectedFilter: string
      isOpen: boolean
}

export const RoomList: React.FC<RoomListProps> = ({
      rooms,
      onRoomSelect,
      selectedRoomId,
      onCreateRoomClick,
      toggleDropdown,
      handleFilterClick,
      selectedFilter,
      isOpen
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
                  {/* Filter Dropdown */}
                  <div className='relative p-4 border-b border-gray-200'>
                        <div
                              className="absolute w-60 md:w-44 top-0  right-0 "
                              onClick={toggleDropdown}
                        >
                              <ul className="block w-60 md:w-44 appearance-none  border-gray-400 hover:border-gray-400 rounded-md leading-tight focus:outline-none focus:shadow-outline">
                                    <li className="pl-3 md:pl-6 py-2.5">{selectedFilter}</li>
                              </ul>
                              <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 px-6">
                                    <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                    >
                                          <path
                                                d="M9.75 4.5L6 8.25L2.25 4.5"
                                                stroke="black"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                          />
                                    </svg>
                              </div>
                        </div>
                  </div>
                  {isOpen && (
                        <div className="absolute top-[6.5rem] left-[9rem] ">
                              <ul className="block w-60 md:w-44 appearance-none bg-white border border-gray-400 hover:border-gray-400 rounded-md shadow-lg leading-tight focus:outline-none focus:shadow-outline">
                                    <li
                                          className="pl-3 md:pl-6 py-2 hover:bg-gray-100"
                                          onClick={() => handleFilterClick("All")}
                                    >
                                          All
                                    </li>
                                    <li
                                          className="pl-3 md:pl-6 py-2 hover:bg-gray-100"
                                          onClick={() => handleFilterClick("Private")}
                                    >
                                          Private
                                    </li>
                                    <li
                                          className="pl-3 md:pl-6 py-2 hover:bg-gray-100"
                                          onClick={() => handleFilterClick("Public")}
                                    >
                                          Public
                                    </li>

                              </ul>

                        </div>
                  )}


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