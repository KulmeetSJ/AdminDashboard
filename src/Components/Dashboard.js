import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [editableUser, setEditableUser] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [originalUsers, setOriginalUsers] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    const itemPerPage = 10;
    let pageVisited = pageCount * itemPerPage;
    const totalPages = Math.ceil(users.length / itemPerPage);
    const pageChange = ({ selected }) => {
        setPageCount(selected);
    };

    useEffect(() => {
        fetch(
            `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
        )
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    }, []);

    const deleteUser = (selectedUser) => {
        let userAfterDeletion = users.filter((user) => {
            return user.id !== selectedUser;
        });
        setUsers(userAfterDeletion);
    };

    const editUserDetails = (user) => {
        setEditableUser({ ...user });
    };

    const saveUserDetails = () => {
        const index = users.findIndex((user) => user.id === editableUser.id);
        if (index !== -1) {
            const updatedUsers = [...users];
            updatedUsers[index] = { ...editableUser };
            setUsers(updatedUsers);
        }
        setEditableUser(null);
    };

    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter((id) => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === users.slice(pageVisited, pageVisited + itemPerPage).length) {
            setSelectedUsers([]);
            setSelectAllChecked(false);
        } else {
            setSelectedUsers(users.slice(pageVisited, pageVisited + itemPerPage).map(user => user.id));
            setSelectAllChecked(true);
        }
    };

    const handleDeleteSelected = () => {
        const updatedUsers = users.filter(user => !selectedUsers.includes(user.id));
        setUsers(updatedUsers);
        setSelectedUsers([]);
        setSelectAllChecked(false);
    };

    const handleSearch = () => {
        // Implement your search logic here
        // For example, filter the users based on the searchUser
        setOriginalUsers(users);
        const filteredUsers = users.filter((user) => {
            return (
                user.id.includes(searchUser) ||
                user.name.includes(searchUser) ||
                user.email.includes(searchUser) ||
                user.role.includes(searchUser)
            );
        });
        // Update the users state with the filtered results
        setUsers(filteredUsers);
        setSearchUser("");
        setIsSearchActive(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleResetSearch = () => {
        // Reset the users state to the original list
        setUsers(originalUsers);

        // Reset the search field
        setSearchUser("");

        // Set the search state to false
        setIsSearchActive(false);
    };

    return (
        <div>
            <div className="container mx-auto my-4">
                <div className="relative ml-10">
                    <button className="absolute inset-y-0 left-0 pl-3 flex items-center  cursor-pointer" onClick={handleSearch}>
                        <SearchIcon />
                    </button>
                    <input
                        type="text"
                        name="name"
                        placeholder="Search by any field"
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        onKeyUp={handleKeyPress}
                        className="p-2 border border-gray-700 rounded-md  focus:outline-none focus:border-blue-500 pl-10"
                    />
                    {isSearchActive && (
                        <RefreshIcon
                            className="absolute ml-1 top-2 cursor-pointer"
                            onClick={handleResetSearch}
                        />
                    )}

                </div>
            </div>



            <div className="container mx-auto my-4">
                <table className="w-full border border-gray-700 ml-auto my-auto table-auto" >
                    <thead className="table-header-group">
                        <tr>
                            <th className="p-2 font-bold">
                                <input
                                    type="checkbox"
                                    className="form-checkbox cursor-pointer"
                                    onChange={handleSelectAll}
                                    checked={selectedUsers.length === users.filter(user => !user.deleted).slice(pageVisited, pageVisited + itemPerPage).length && users.filter(user => !user.deleted).length > 0}
                                />
                            </th>
                            <th className="p-2 font-bold">Id</th>
                            <th className="p-2 font-bold">Name</th>
                            <th className="p-2 font-bold">Email</th>
                            <th className="p-2 font-bold">Role</th>
                            <th className="p-2 font-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter((user) => {
                                if (searchUser === "") return user;
                                else if (
                                    user.id.includes(searchUser) ||
                                    user.name.includes(searchUser) ||
                                    user.email.includes(searchUser) ||
                                    user.role.includes(searchUser)
                                ) {
                                    return user;
                                }
                                return user;
                            })
                            .slice(pageVisited, pageVisited + itemPerPage)
                            .map((user) => (
                                <tr key={user.id} style={{ backgroundColor: selectedUsers.length > 0 && selectedUsers.includes(user.id) ? "gray" : "white" }} >
                                    <td className="p-2 ">
                                        <input
                                            type="checkbox"
                                            className="cursor-pointer"
                                            readOnly={editableUser !== null}
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => handleUserSelect(user.id)}
                                        />
                                    </td>
                                    <td className="p-2" >{user.id}</td>
                                    <td className="p-2" >
                                        {editableUser === null || editableUser.id !== user.id ? (
                                            <div>{user.name}</div>
                                        ) : (
                                            <input
                                                type="text"
                                                value={editableUser.name}
                                                onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
                                                className="border rounded-md p-2"
                                            />
                                        )}
                                    </td>
                                    <td className="p-2 " >
                                        {editableUser === null || editableUser.id !== user.id ? (
                                            <div>{user.email}</div>
                                        ) : (
                                            <input
                                                type="text"
                                                value={editableUser.email}
                                                onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
                                                className="border rounded-md p-2"
                                            />
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editableUser === null || editableUser.id !== user.id ? (
                                            <div>{user.role}</div>
                                        ) : (
                                            <input
                                                type="text"
                                                value={editableUser.role}
                                                onChange={(e) => setEditableUser({ ...editableUser, role: e.target.value })}
                                                className="border rounded-md p-2"
                                            />
                                        )}
                                    </td>
                                    <td className="p-2 action-cell space-x-2">
                                        {editableUser === null || editableUser.id !== user.id ? (
                                            <button onClick={() => editUserDetails(user)} className="bg-blue-500 text-white px-2 py-1 rounded">
                                                Edit
                                            </button>
                                        ) : (
                                            <button onClick={saveUserDetails} className="bg-green-500 text-white px-2 py-1 rounded">
                                                Save
                                            </button>
                                        )}
                                        <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="ml-5 text-gray-600">
                            {selectedUsers.length > 0 ? `Selected ${selectedUsers.length} rows` : "No rows selected"}
                        </p>
                    </div>
                    {(selectedUsers.length > 0 || selectAllChecked) && (
                        <button onClick={handleDeleteSelected} className="mr-10 bg-red-500 text-white px-2 py-1 rounded">
                            Delete Selected
                        </button>
                    )}
                </div>
                <div className="flex items-center justify-center mt-4" >
                    <ReactPaginate
                        previousLabel="Prev"
                        nextLabel="Next"
                        pageCount={totalPages}
                        onPageChange={pageChange}
                        containerClassName="flex space-x-2"
                        pageClassName="px-3 py-2 border border-gray-700 rounded cursor-pointer "
                        activeClassName="bg-blue-500 text-white"
                        previousClassName="px-3 py-2 border border-gray-700 rounded cursor-pointer"
                        nextClassName="px-3 py-2 border border-gray-700 rounded cursor-pointer"
                        disabledClassName="bg-gray-300 text-gray-600 cursor-no-drop"
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

