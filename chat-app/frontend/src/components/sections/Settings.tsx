import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { IChatRoom, IGetUsers, IResponse } from "../interfaces/interfaces";
import { useAuth } from "../../context/AuthContext";

interface SettingsProps {
      isPrivate: boolean | undefined;
      isOpen: boolean
      setIsOpen: () => void
      chatRoomId: string
}
export const Settings: React.FC<SettingsProps> = ({ isPrivate, isOpen, setIsOpen, chatRoomId }) => {
      const { user } = useAuth()
      const [openDropdown, setOpenDropdown] = useState(false)
      const [openPartipants, setOpenParticipants] = useState(false)
      const [users, setUsers] = useState<IGetUsers[] | []>([])
      const [participants, setParticipants] = useState<IChatRoom | null>(null)
      const [userIds, setUserIds] = useState<string[]>([])
      console.log("UserIds", userIds)
      const handleUserIds = (userId: string) => {
            setUserIds(prev => {
                  if (prev.includes(userId)) {
                        return prev.filter(id => id !== userId)
                  }
                  return [...prev, userId]
            })
      }
      const { data: usersData, refetch: refetchNonParticipants, loading: isUsersLoading, error: userError } = useApi<IResponse<IGetUsers[]>>(`/rooms/${chatRoomId}/non-participants/get`, 'GET', null, [chatRoomId])
      const { data: participantsData, refetch: refetchParticipants, loading: isParticipantsLoading, error: participantsError } = useApi<IResponse<IChatRoom>>(`/rooms/${chatRoomId}/participants/get`, 'GET', null, [chatRoomId])
      const { fetchData: addParticipants, error: addError, loading: isAdding } = useApi<IResponse<IChatRoom>>(`/rooms/${chatRoomId}/add`, 'POST')
      useEffect(() => {
            if (usersData?.data) {
                  setUsers(usersData.data);
            }
      }, [usersData]);

      useEffect(() => {
            if (participantsData?.data) {
                  console.log("Par", participantsData.data)
                  setParticipants(participantsData.data);
            }
      }, [participantsData]);
      const handleAddParticipants = async (participants: string[]) => {
            try {
                  const response = await addParticipants(participants)
                  if (response?.success && response.data) {
                        setOpenDropdown(false)
                        setUserIds([])
                        refetchNonParticipants()
                        refetchParticipants()
                        console.log("Chatroom", response?.data)
                  }
            } catch (err) {
                  alert("Failed adding participants")
                  console.log(err)
                  throw err
            }
      }
      if (isUsersLoading || isAdding || isParticipantsLoading) {
            return (
                  <div className="flex items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
            )
      }
      if (userError || addError || participantsError) {
            return (
                  <div className="flex items-center justify-center h-screen">
                        <div className="text-red-500">Failed to load . Please try again later.</div>
                  </div>
            )
      }


      return (<>
            <div className="relative">
                  {/* Settings Button */}
                  <button
                        onClick={setIsOpen}
                        className=" p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-all duration-200"
                  >
                        Settings
                  </button>
                  {isOpen && (
                        <>
                              <div
                                    className="fixed inset-0 bg-gray-300 bg-opacity-50 transition-opacity z-40"
                                    onClick={setIsOpen}
                              />

                              <div
                                    className={`fixed top-0 right-0 h-full w-[45rem] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                                          }`}
                              >
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-4 border-b border-gray-300">
                                          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
                                          <button
                                                onClick={setIsOpen}
                                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-300"
                                          >
                                                X
                                          </button>
                                    </div>

                                    <nav className="p-4">
                                          {isPrivate && (
                                                <>
                                                      <button onClick={() => setOpenParticipants(!openPartipants)} className="text-gray-800 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full" type="button">Show Participants <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                                      </svg>
                                                      </button>
                                                      {
                                                            openPartipants && (
                                                                  <div id="dropdownSearch" className="z-10  bg-gray-200 rounded-lg shadow w-full">
                                                                        <div className="p-3">
                                                                              <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
                                                                                    <li>
                                                                                          <div className="flex items-center ps-2 rounded hover:bg-gray-100">
                                                                                                {participants && participants.creator.name} (Creator)
                                                                                          </div>
                                                                                    </li>

                                                                                    {participants && participants.participants.length > 0 ? participants?.participants?.map((participant) => (
                                                                                          <li>
                                                                                                <div className="flex items-center ps-2 rounded hover:bg-gray-100">
                                                                                                      {participant.name}
                                                                                                </div>
                                                                                          </li>

                                                                                    )) : "No participants available"

                                                                                    }
                                                                              </ul>
                                                                        </div>
                                                                  </div>
                                                            )
                                                      }
                                                      {user?.id === participants?.creator.id && (
                                                            <>
                                                                  <button onClick={() => setOpenDropdown(!openDropdown)} className="text-gray-800 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full" type="button">Add participants <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                                                  </svg>
                                                                  </button>
                                                                  {openDropdown && (
                                                                        <div id="dropdownSearch" className="z-10  bg-gray-200 rounded-lg shadow w-full">
                                                                              <div className="p-3">
                                                                                    <label className="sr-only">Search</label>
                                                                                    <div className="relative">
                                                                                          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                                                                </svg>
                                                                                          </div>
                                                                                          <input type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50    dark:border-gray-500  " placeholder="Search user" />
                                                                                    </div>
                                                                              </div>
                                                                              <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
                                                                                    {users.length > 0 ? users.map((user) => (
                                                                                          <>
                                                                                                <li>
                                                                                                      <div className="flex items-center ps-2 rounded hover:bg-gray-100">
                                                                                                            <input id="checkbox-item-11" type="checkbox"
                                                                                                                  checked={userIds.includes(user.id)}
                                                                                                                  value={user.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2  dark:border-gray-500" onChange={() => handleUserIds(user.id)} />
                                                                                                            <label className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded">{user.name}</label>
                                                                                                      </div>
                                                                                                </li>
                                                                                          </>
                                                                                    )) : "No users available"}

                                                                              </ul>
                                                                              <button className="flex items-center p-3 text-sm font-medium text-gray-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100  hover:underline"
                                                                                    disabled={userIds.length === 0}
                                                                                    onClick={() => handleAddParticipants(userIds)}
                                                                              >
                                                                                    Add
                                                                              </button>

                                                                        </div >
                                                                  )}
                                                            </>
                                                      )}



                                                </>
                                          )}

                                    </nav>


                              </div>
                        </>
                  )}

            </div>
      </>)

}