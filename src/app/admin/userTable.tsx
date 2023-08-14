import {
    Card,
    Title,
    Text,
    Flex,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Badge,
    Button,
    Color,
  } from "@tremor/react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { SafeUser } from "../types";
import axios from 'axios';
import { TailSpin } from "react-loader-spinner";
import useConfirmationModal from "../hooks/useConfirmationModal";
import UserConfirmationModal from "../components/modals/UserConfirmationModal";
  
const colors: { [key: string]: Color } = {
Verification: "gray",
Active: "emerald",
};

interface UserTableProps {
    users: SafeUser[];
}

const handleDeleteUser = (id: string) => {
    console.log("Delete User: ", id);
    const data = {
        id: id
    }
    axios.post("/api/deleteUser", data).then((res) => {
        console.log(res.data);
    });
}


  
const UserTable: React.FC<UserTableProps> = ({
    users
}) => {
    const userConfirmationModal = useConfirmationModal();

    const [search, setSearch] = useState("");
    const [displayUsers, setDisplayUsers] = useState(users);
    const [isLoading, setIsLoading] = useState(false);

    async function getResults(search: string) {
        console.log("Search Results: ", search);

        const body = {
        search : search
        }

        axios.post("/api/searchUsers", body ).then((res) => {
            console.log(res.data);
            setDisplayUsers(res.data);
            setIsLoading(false);
        });
    }

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(search);
        setIsLoading(true);
        getResults(search);
      };

    return (
            
            <Card className="mt-6">
                <div className="flex mt-2 mb-5 max-w-md gap-2 items-center">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <div className="rounded-md shadow-sm flex">
                        <input
                        type="text"
                        name="search"
                        id="search"
                        className="h-10 block w-full rounded-md border border-gray-200 pl-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Search by name..."
                        spellCheck={false}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button variant="secondary" color="gray" onClick={handleSearch}>Search</Button>
                    <TailSpin
                                height="20"
                                width="20"
                                color="#000000"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={isLoading === true}
                                />
                </div>
                
                <Card>
                    <Flex justifyContent="start" className="space-x-2">
                        <Title>Users</Title>
                        <Badge color="gray">{displayUsers.length}</Badge>
                    </Flex>
                    {/* <Text className="mt-2">Overview of this month's purchases</Text> */}

                    <Table className="mt-6">
                        <TableHead>
                        <TableRow>
                            <TableHeaderCell>User ID</TableHeaderCell>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Created on</TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                        {displayUsers.map((item) => (
                            <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                <Badge color="gray" size="xs">
                                Active
                                </Badge>
                            </TableCell>
                            <TableCell>{item.createdAt}</TableCell>
                            <TableCell>
                                <UserConfirmationModal id={item.id} />
                                <Button size="xs" variant="secondary" color="red" onClick={userConfirmationModal.onOpen}>
                                    Delete
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Card>
            </Card>
    );
  }
  

export default UserTable;