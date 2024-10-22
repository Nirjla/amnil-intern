import { useState, useEffect } from 'react';
import { RoomList } from '../sections/RoomList';
import { ChatRoom } from '../sections/ChatRoom';
import { CreateRoom } from '../sections/CreateRoom';
import { useAuth } from '../../context/AuthContext';
import useApi from '../../hooks/useApi';
import { IChatRoom, IResponse } from '../interfaces/interfaces';

export const MainChat = () => {
      const { user: currentUser, token } = useAuth();
      const [rooms, setRooms] = useState<IChatRoom[]>([]);
      const [selectedRoom, setSelectedRoom] = useState<IChatRoom | null>(null);
      const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);

      //fetching rooms
      const {
            data: roomData,
            error: isRoomError,
            loading: isRoomLoading,
            refetch: refetchRooms
      } = useApi<IResponse<IChatRoom[]>>('/rooms', 'GET', null, [token]);

      //creating rooms
      const {
            fetchData: createRoom,
            error: roomCreateError,
            loading: isCreatingRoom
      } = useApi<IResponse<IChatRoom>>('/rooms', 'POST');

      // Handle rooms data update
      useEffect(() => {
            if (roomData?.success && roomData.data) {
                  setRooms(roomData.data);
            }
      }, [roomData]);

      const handleCreateRoom = async (roomData: { name: string; description: string }) => {
            try {
                  // Only make the POST request when we have actual data
                  const response = await createRoom(roomData);

                  if (response?.success && response.data) {
                        setRooms(prev => [...prev, response.data!]);
                        setSelectedRoom(response.data);
                        setIsCreateRoomOpen(false);
                        refetchRooms(); // Refresh the room list
                  }
            } catch (error) {
                  console.error('Failed to create room:', error);
            }
      };

      // Loading state
      if (isRoomLoading) {
            return (
                  <div className="flex items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
            );
      }

      // Error state
      if (isRoomError || !roomData?.success) {
            return (
                  <div className="flex items-center justify-center h-screen">
                        <div className="text-red-500">
                              {isRoomError?.message || 'Failed to fetch rooms'}
                        </div>
                  </div>
            );
      }

      return (
            <div className="flex h-screen bg-white">
                  {/* Room List */}
                  <RoomList
                        rooms={rooms}
                        selectedRoomId={selectedRoom?.id}
                        onRoomSelect={setSelectedRoom}
                        onCreateRoomClick={() => setIsCreateRoomOpen(true)}
                  />

                  {/* Chat Area */}
                  <div className="flex-1">
                        {selectedRoom ? (
                              <ChatRoom
                                    chatRoomId={selectedRoom.id}
                                    currentUser={currentUser!}
                                    token={token!}
                              />
                        ) : (
                              <div className="h-full flex items-center justify-center text-gray-500">
                                    Select a room to start chatting
                              </div>
                        )}
                  </div>

                  {/* Create Room Modal */}
                  <CreateRoom
                        isOpen={isCreateRoomOpen}
                        onClose={() => {
                              setIsCreateRoomOpen(false);
                        }}
                        onCreateRoom={handleCreateRoom}
                        isLoading={isCreatingRoom}
                        error={roomCreateError?.message}
                  />
            </div>
      );
};