// import Search from "../reusables/Search";

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import useApi from "../../hooks/useApi"
import { IChatMembers, IGetUsers, IResponse } from "../interfaces/interfaces"

export default function Dashboard() {
      const { user, isAuthenticated, logout } = useAuth()
      const { data, error, loading } = useApi<IResponse<IGetUsers[]>>("/auth/users", "GET")
      // const { }
      console.log("user", user)
      const memberId = isAuthenticated() && user?.id
      const { data: chatData, error: chatError, loading: chatLoading } = useApi<IResponse<IChatMembers[]>>(`/chat/${memberId}`, "GET")
      const chatMembers = chatData?.data?.map(chat => ({
            ...chat,
            members: chat.members?.filter(member => member !== user?.id)

      }))
      console.log("CM", chatMembers)
      console.log("CM", chatData?.data)
      const [showDropdown, setShowDropdown] = useState(false)
      if (loading || chatLoading) {
            return <p>Loading</p>
      }
      const getUsers = data && data.data
      // console.log("Data", usernames)
      if (error || chatError) {
            console.log('Err', error)
      }

      return (
            <>
                  <div className="">
                        {/* <!-- component --> */}
                        <div className="flex h-screen overflow-hidden">
                              {/* <!-- Sidebar --> */}
                              <div className="W-1/3 bg-white border-r border-gray-300">
                                    {/* <!-- Sidebar Header --> */}
                                    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                                          <h1 className="text-2xl font-semibold">{
                                                isAuthenticated() ? `Hello ${user?.name}` : "Hello User"
                                          }</h1>
                                          <div className="relative">
                                                <button id="menuButton" className="focus:outline-none" onClick={() => setShowDropdown(!showDropdown)}>
                                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                                                      </svg>
                                                </button>
                                                {/* <!-- Menu Dropdown --> */}
                                                <div id="menuDropdown" className={`z-50 absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg ${showDropdown ? '' : 'hidden'} `}  >
                                                      <ul className="py-2 px-3 ">
                                                            <li><button className="text-left w-full block px-4 py-2 text-gray-800 hover:text-gray-400" onClick={logout}>Log Out</button></li>
                                                            {/* <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li> */}
                                                            {/* <!-- Add more menu options here --> */}
                                                      </ul>
                                                </div>
                                          </div>
                                    </header>

                                    <div className="max-w-md mx-auto p-4">
                                          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                          <div className="relative">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                      <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                      </svg>
                                                </div>
                                                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " placeholder="Search users..." required />

                                          </div>
                                    </div>


                                    {/* <!-- Contact List --> */}
                                    <div className="overflow-y-auto h-screen p-3 mb-9 pb-20 ">
                                          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                                                {getUsers?.map((item, index) => (
                                                      <div key={index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                                            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                                                  <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                                                            </div>
                                                            <div className="flex-1">
                                                                  <h2 className="text-lg font-semibold">{item.name}</h2> {/* Replace 'name' with the correct property for username */}
                                                                  {/* <p className="text-gray-600">{item.status}</p> Replace 'status' with the correct property for status/message */}
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                          {/* 

                                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                                      <img src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                                                </div>
                                                <div className="flex-1">
                                                      <h2 className="text-lg font-semibold">Martin</h2>
                                                      <p className="text-gray-600">That pizza place was amazing! We should go again sometime. 🍕</p>
                                                </div>
                                          </div>

                                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                                      <img src="https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                                                </div>
                                                <div className="flex-1">
                                                      <h2 className="text-lg font-semibold">Charlie</h2>
                                                      <p className="text-gray-600">Hey, do you have any recommendations for a good movie to watch?</p>
                                                </div>
                                          </div>

                                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                                      <img src="https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                                                </div>
                                                <div className="flex-1">
                                                      <h2 className="text-lg font-semibold">David</h2>
                                                      <p className="text-gray-600">I just finished reading a great book! It was so captivating.</p>
                                                </div>
                                          </div>

                                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                                      <img src="https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                                                </div>
                                                <div className="flex-1">
                                                      <h2 className="text-lg font-semibold">Ella</h2>
                                                      <p className="text-gray-600">What's the plan for this weekend? Anything fun?</p>
                                                </div>
                                          </div>

                                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                                      <img src="https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                                                </div>
                                                <div className="flex-1">
                                                      <h2 className="text-lg font-semibold">Fiona</h2>
                                                      <p className="text-gray-600">I heard there's a new exhibit at the art museum. Interested?</p>
                                                </div>
                                          </div>

                                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                                      <img src="https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                                                </div>
                                                <div className="flex-1">
                                                      <h2 className="text-lg font-semibold">George</h2>
                                                      <p className="text-gray-600">I tried that new cafe downtown. The coffee was fantastic!</p>
                                                </div>
                                          </div>

                                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                                      <img src="https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                                                </div>
                                                <div className="flex-1">
                                                      <h2 className="text-lg font-semibold">Hannah</h2>
                                                      <p className="text-gray-600">I'm planning a hiking trip next month. Want to join?</p>
                                                </div>
                                          </div>

                                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                                      <img src="https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                                                </div>
                                                <div className="flex-1">
                                                      <h2 className="text-lg font-semibold">Ian</h2>
                                                      <p className="text-gray-600">Let's catch up soon. It's been too long!</p>
                                                </div>
                                          </div>

                                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                                      <img src="https://placehold.co/200x/30916c/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                                                </div>
                                                <div className="flex-1">
                                                      <h2 className="text-lg font-semibold">Jack</h2>
                                                      <p className="text-gray-600">Remember that hilarious joke you told me? I can't stop laughing!</p>
                                                </div>
                                          </div> */}


                                    </div>
                              </div>

                              {/* <!-- Main Chat Area --> */}
                              <div className="w-full relative bg-gray-300">
                                    {/* <!-- Chat Header --> */}
                                    <header className="bg-white p-4 text-gray-700">
                                          <h1 className="text-2xl font-semibold">Alice</h1>
                                    </header>

                                    {/* <!-- Chat Messages --> */}
                                    <div className="h-screen overflow-y-auto p-4 pb-36">
                                          {/* <!-- Incoming Message --> */}
                                          <div className="flex mb-4 cursor-pointer">
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                                      <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                                      <p className="text-gray-700">Hey Bob, how's it going?</p>
                                                </div>
                                          </div>

                                          {/* <!-- Outgoing Message --> */}
                                          <div className="flex justify-end mb-4 cursor-pointer">
                                                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                                      <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
                                                </div>
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                                      <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                          </div>

                                          {/* <!-- Incoming Message --> */}
                                          <div className="flex mb-4 cursor-pointer">
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                                      <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                                      <p className="text-gray-700">That book sounds interesting! What's it about?</p>
                                                </div>
                                          </div>

                                          {/* <!-- Outgoing Message --> */}
                                          <div className="flex justify-end mb-4 cursor-pointer">
                                                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                                      <p>It's about an astronaut stranded on Mars, trying to survive. Gripping stuff!</p>
                                                </div>
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                                      <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                          </div>

                                          {/* <!-- Incoming Message --> */}
                                          <div className="flex mb-4 cursor-pointer">
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                                      <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                                      <p className="text-gray-700">I'm intrigued! Maybe I'll borrow it from you when you're done?</p>
                                                </div>
                                          </div>

                                          {/* <!-- Outgoing Message --> */}
                                          <div className="flex justify-end mb-4 cursor-pointer">
                                                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                                      <p>Of course! I'll drop it off at your place tomorrow.</p>
                                                </div>
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                                      <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                          </div>

                                          {/* <!-- Incoming Message --> */}
                                          <div className="flex mb-4 cursor-pointer">
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                                      <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                                      <p className="text-gray-700">Thanks, you're the best!</p>
                                                </div>
                                          </div>

                                          {/* <!-- Outgoing Message --> */}
                                          <div className="flex justify-end mb-4 cursor-pointer">
                                                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                                      <p>Anytime! Let me know how you like it. 😊</p>
                                                </div>
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                                      <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                          </div>

                                          {/* <!-- Incoming Message --> */}
                                          <div className="flex mb-4 cursor-pointer">
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                                      <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                                      <p className="text-gray-700">So, pizza next week, right?</p>
                                                </div>
                                          </div>

                                          {/* <!-- Outgoing Message --> */}
                                          <div className="flex justify-end mb-4 cursor-pointer">
                                                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                                      <p>Absolutely! Can't wait for our pizza date. 🍕</p>
                                                </div>
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                                      <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                          </div>
                                          {/* <!-- Incoming Message --> */}
                                          <div className="flex mb-4 cursor-pointer">
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                                      <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                                                </div>
                                                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                                      <p className="text-gray-700">Hoorayy!!</p>
                                                </div>
                                          </div>

                                    </div>

                                    {/* <!-- Chat Input --> */}
                                    <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
                                          <div className="flex items-center">
                                                <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
                                                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                                          </div>
                                    </footer>
                              </div>
                        </div>
                  </div >
                  {/* // JavaScript for showing/hiding the menu
                        const menuButton = document.getElementById('menuButton');
                        const menuDropdown = document.getElementById('menuDropdown');
      
      menuButton.addEventListener('click', () => {
        if (menuDropdown.classNameList.contains('hidden')) {
                              menuDropdown.classNameList.remove('hidden');
        } else {
                              menuDropdown.classNameList.add('hidden');
        }
      });

      // Close the menu if you click outside of it
      document.addEventListener('click', (e) => {
        if (!menuDropdown.contains(e.target) && !menuButton.contains(e.target)) {
                              menuDropdown.classNameList.add('hidden');
        }
      });
                  </script> */}
            </>
      )
}