import React, { useState } from 'react';

interface CreateRoomProps {
      isOpen: boolean;
      onClose: () => void;
      onCreateRoom: (data: { name: string; description: string, isPrivate: boolean }) => void;
      isLoading?: boolean;
      error?: string;
}

export const CreateRoom: React.FC<CreateRoomProps> = ({
      isOpen,
      onClose,
      onCreateRoom,
      isLoading,
}) => {
      const [name, setName] = useState('');
      const [description, setDescription] = useState('');
      const [isPrivate, setIsPrivate] = useState(false)
      if (!isOpen) return null;

      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onCreateRoom({ name, description, isPrivate });
      };

      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Create New Room</h2>

                        {/* {error && (
                              <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
                                    {error}
                              </div>
                        )} */}

                        <form onSubmit={handleSubmit}>
                              <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                          Room Name
                                    </label>
                                    <input
                                          type="text"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                          disabled={isLoading}
                                          required
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                          Description
                                    </label>
                                    <textarea
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}
                                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                          disabled={isLoading}
                                          rows={3}
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                          Do you want to make group private?
                                    </label>
                                    <div className="flex items-center mb-4">
                                          <input
                                                type="radio"
                                                name="privacy"
                                                checked={isPrivate === true}
                                                onChange={() => setIsPrivate(true)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                          />
                                          <label className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                                                Yes
                                          </label>
                                    </div>
                                    <div className="flex items-center">
                                          <input
                                                type="radio"
                                                name="privacy"
                                                checked={isPrivate === false}
                                                onChange={() => setIsPrivate(false)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                          />
                                          <label className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                                                No
                                          </label>
                                    </div>
                              </div>

                              <div className="flex justify-end space-x-2">
                                    <button
                                          type="button"
                                          onClick={onClose}
                                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                          disabled={isLoading}
                                    >
                                          Cancel
                                    </button>
                                    <button
                                          type="submit"
                                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                          disabled={isLoading || !name.trim()}
                                    >
                                          {isLoading ? 'Creating...' : 'Create Room'}
                                    </button>
                              </div>
                        </form>
                  </div >
            </div >
      );
};